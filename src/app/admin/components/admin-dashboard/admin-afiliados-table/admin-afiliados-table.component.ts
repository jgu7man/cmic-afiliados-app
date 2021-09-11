import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfiliadoModel, iManager } from 'src/app/public/afiliados/models/afiliados.model';
import { ManagersService } from 'src/app/public/afiliados/services/managers.service';
import { AfiliadosService } from 'src/app/public/afiliados/services/afiliados.service';
import { Router } from '@angular/router';
import { MxCache } from '@marxa/devkit';
import { MxStorage } from '@marxa/storage';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: './admin-afiliados-table.component.html',
  styleUrls: ['./admin-afiliados-table.component.scss']
})
export class AdminAfiliadosTableComponent implements OnInit, OnDestroy {

  afiliados: AfiliadoModel[] = []
  displayedColumns = [
   'nombre', 'RFC',   'options'
  ]
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource(this.afiliados);

  currentPage: AfiliadoModel[] = []
  pageSize: number = 10
  first: number = 0
  page: number = 1

  afiliadosListSubscription: Subscription
  constructor(
    private _paginator: MatPaginatorIntl,
    private _afiliados: AfiliadosService,
    private _router: Router,
    private _cache: MxCache,
    private _storage: MxStorage,
    private _bottom: MatBottomSheet
  ) {
    this.afiliadosListSubscription = this._afiliados
      .getFullList()
      .subscribe( list => {
        // console.log( list )
        this.afiliados = list
    })
    this._paginator.itemsPerPageLabel="Elementos por página"
    this._paginator.lastPageLabel="Última página"
    this._paginator.nextPageLabel="Siguiente página"
    this._paginator.previousPageLabel = "Página anterior"




  }

  ngOnInit(): void {
    this.currentPage = this.afiliados.slice(this.first, this.first + this.pageSize)
  }

  ngAfterViewInit() {
    if(this.sort) this.dataSource.sort = this.sort;
  }

  onPageEvent(event: PageEvent) {
    console.log( event )
    this.pageSize = event.pageSize
    this.page = event.pageIndex
    this.first = event.pageIndex * this.pageSize
    this.currentPage = this.afiliados.slice(this.first, this.first + this.pageSize)
  }

  onSelect(afiliado: AfiliadoModel) {
    this._cache.updateData('rfc',afiliado.datos_generales.RFC )
    this._router.navigate(['/afiliados/perfil', afiliado.datos_generales.RFC  ])
  }

  onDownload() {
    this._storage.downloadList(this.afiliados, 'Lista de afiliados')
  }

  onOptions(afiliado: AfiliadoModel) {
    this._bottom.open( BottomAdminAfiliado, {
      data: afiliado
    })
  }

  ngOnDestroy() {
    this.afiliadosListSubscription.unsubscribe
  }

}



@Component({
  templateUrl: './bottom-options-afiliado.html',
  styleUrls: ['./admin-afiliados-table.component.scss']
})
export class BottomAdminAfiliado implements OnInit, OnDestroy {

  managers: iManager[] = [];
  private managersSubscription: Subscription
  constructor (
    @Inject( MAT_BOTTOM_SHEET_DATA ) public afiliado: AfiliadoModel,
    private sheet: MatBottomSheetRef<BottomAdminAfiliado>,
    private _cache: MxCache,
    private _router: Router,
    private _afiliados: AfiliadosService,
    private _managers: ManagersService
  ) {
    this.managersSubscription =
    this._managers.getForAfiliado( this.afiliado.datos_generales.RFC )
      .subscribe( list => {
        // console.log( list )
        this.managers = list
    })
   }

  ngOnInit(): void { }

  onSelect() {
    this._cache.updateData('rfc', this.afiliado.datos_generales.RFC )
    this._router.navigate(['/afiliados/perfil', this.afiliado.datos_generales.RFC  ])
    this.sheet.dismiss()
  }

  sendEmailAcepted() {
    console.log( this.managers )
    this.managers.forEach( m => {
      this._afiliados.sendAceptedMail(
        m.email,
        this.afiliado.datos_generales.RFC
      )
    } )
    this.sheet.dismiss()
  }

  ngOnDestroy() {
    this.managersSubscription.unsubscribe()
  }

}
