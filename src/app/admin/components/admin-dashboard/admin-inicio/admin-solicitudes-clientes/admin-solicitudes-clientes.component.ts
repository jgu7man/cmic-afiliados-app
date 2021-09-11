import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { iPeticion } from 'src/app/admin/models/roles.model';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientsService } from 'src/app/public/clientes/services/clients.service';
import firebase from 'firebase/app'
import { iCliente } from 'src/app/public/clientes/models/cliente.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'g-admin-solicitudes-clientes',
  templateUrl: './admin-solicitudes-clientes.component.html',
  styleUrls: ['./admin-solicitudes-clientes.component.scss']
})
export class AdminSolicitudesClientesComponent implements OnInit, OnDestroy {
  clientes: iPeticion[] = []
  displayedColumns = [
    'comercial_nombre', 'email', 'request', 'options'
  ]
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource(this.clientes);

  currentPage: iPeticion[] = []
  pageSize: number = 10
  first: number = 0
  page: number = 1

  private clientSolicitudesSubscription: Subscription

  constructor(
    private _paginator: MatPaginatorIntl,
    private _dialog: MatDialog,
    private _clientes: ClientsService,
  ) {
    this.clientSolicitudesSubscription = this._clientes
      .getSolicitudes()
      .subscribe( list => {
        // console.log( list )
        this.clientes = list
    })
    this._paginator.itemsPerPageLabel="Elementos por página"
    this._paginator.lastPageLabel="Última página"
    this._paginator.nextPageLabel="Siguiente página"
    this._paginator.previousPageLabel = "Página anterior"
  }

  ngOnInit(): void {
    this.currentPage = this.clientes.slice(this.first, this.first + this.pageSize)
  }

  ngAfterViewInit() {
    if(this.sort) this.dataSource.sort = this.sort;
  }

  onPageEvent(event: PageEvent) {
    console.log( event )
    this.pageSize = event.pageSize
    this.page = event.pageIndex
    this.first = event.pageIndex * this.pageSize
    this.currentPage = this.clientes.slice(this.first, this.first + this.pageSize)
  }

  toDate(date: Date | firebase.firestore.Timestamp) {
    return 'seconds' in date ? new Date(date.seconds * 1000) : date
  }

  seeRequest(data: any) {
    this._dialog.open(DialogAceptClientComponent, {
      minHeight: '50%',
      minWidth: '50%',
      data,
    })
  }

  ngOnDestroy() {
    this.clientSolicitudesSubscription.unsubscribe()
  }
}


@Component({
  templateUrl: './dialog-acept-client.component.html',
  styleUrls: ['./admin-solicitudes-clientes.component.scss']
})
export class DialogAceptClientComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public peticion: iCliente,
    public dialog: MatDialogRef<DialogAceptClientComponent>,
    public clientes: ClientsService
  ) { }

  ngOnInit(): void {
  }

}
