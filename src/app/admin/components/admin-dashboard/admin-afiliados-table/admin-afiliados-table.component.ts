import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AfiliadoModel, iManager } from 'src/app/public/afiliados/models/afiliados.model';
import { ManagersService } from 'src/app/public/afiliados/services/managers.service';
import { AfiliadosService } from 'src/app/public/afiliados/services/afiliados.service';
import { Router } from '@angular/router';
import { MxCache } from '@marxa/devkit';
import { MxStorage } from '@marxa/storage';


@Component({
  templateUrl: './admin-afiliados-table.component.html',
  styleUrls: ['./admin-afiliados-table.component.scss']
})
export class AdminAfiliadosTableComponent implements OnInit {

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
  constructor(
    private _paginator: MatPaginatorIntl,
    private _dialog: MatDialog,
    private _afiliados: AfiliadosService,
    private _router: Router,
    private _cache: MxCache,
    private _storage:MxStorage
  ) {
    this._afiliados.getFullList().subscribe(list => {
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
    this._router.navigate(['/afiliados/perfil' ])
  }

  onDownload() {
    this._storage.downloadList(this.afiliados)
  }

}
