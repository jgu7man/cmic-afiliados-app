import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { iPeticion } from 'src/app/admin/models/roles.model';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from 'src/app/public/clientes/services/clients.service';
import firebase from 'firebase/app'
import { iAfiliadoRequest } from 'src/app/public/afiliados/models/afiliados.model';
import { AfiliadosService } from 'src/app/public/afiliados/services/afiliados.service';

@Component({
  selector: 'g-admin-solicitudes-afiliados',
  templateUrl: './admin-solicitudes-afiliados.component.html',
  styleUrls: ['./admin-solicitudes-afiliados.component.scss']
})
export class AdminSolicitudesAfiliadosComponent implements OnInit {

  afiliados: iAfiliadoRequest[] = []
  displayedColumns = [
    'empresa.comercial_nombre', 'email', 'request', 'options'
  ]
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource(this.afiliados);

  currentPage: iAfiliadoRequest[] = []
  pageSize: number = 10
  first: number = 0
  page: number = 1

  constructor(
    private _paginator: MatPaginatorIntl,
    private _dialog: MatDialog,
    private _afiliados: AfiliadosService,
  ) {
    this._afiliados.getPeticiones().subscribe(list => {
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
    this.pageSize = event.pageSize
    this.page = event.pageIndex
    this.first = event.pageIndex * this.pageSize
    this.currentPage = this.afiliados.slice(this.first, this.first + this.pageSize)
  }

  toDate(date: Date | firebase.firestore.Timestamp) {
    return 'seconds' in date ? new Date(date.seconds * 1000) : date
  }

  seeRequest(data: any) {
    this._dialog.open(DialogAceptAfiliadoComponent, {
      minHeight: '50%',
      minWidth: '50%',
      data,
    })
  }

}

@Component({
  templateUrl: './dialog-acept-afiliados.component.html',
  styleUrls: ['./admin-solicitudes-afiliados.component.scss']
})
export class DialogAceptAfiliadoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public peticion: iAfiliadoRequest,
    public dialog: MatDialogRef<DialogAceptAfiliadoComponent>,
    public afiliados: AfiliadosService
  ) { }

  ngOnInit(): void {}

}
