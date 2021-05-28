import { MatTableDataSource } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
// import { iPeticion } from 'src/app/admin/models/roles.model';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from 'src/app/public/clientes/services/clients.service';
import firebase from 'firebase/app'
import { iCliente } from 'src/app/public/clientes/models/cliente.model';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSelectionListChange } from '@angular/material/list';
import { MxStorage } from '@marxa/storage';
import { DialogAceptClientComponent } from '../admin-inicio/admin-solicitudes-clientes/admin-solicitudes-clientes.component';

@Component({
  templateUrl: './admin-clientes.component.html',
  styleUrls: ['./admin-clientes.component.scss']
})
export class AdminClientesComponent implements OnInit {

  clientes: iCliente[] = []
  displayedColumns = [
    'comercial_nombre', 'email', 'request', 'options'
  ]
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource(this.clientes);

  currentPage: iCliente[] = []
  pageSize: number = 10
  first: number = 0
  page: number = 1

  @ViewChild('clientePanel') private clientePanel?: MatDrawer
  clientSelected?: iCliente

  constructor(
    private _paginator: MatPaginatorIntl,
    private _dialog: MatDialog,
    private _clientes: ClientsService,
    private _storage: MxStorage
  ) {
    this._clientes.getList().subscribe(list => {
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

  onClienteSelect(client: iCliente) {
    this.clientSelected = client
    this.clientePanel?.open()
  }

  onClosePanel() {
    this.clientePanel?.close()
    delete this.clientSelected
  }

  seeRequest(data: any) {
    this._dialog.open(DialogAceptClientComponent, {
      minHeight: '50%',
      minWidth: '50%',
      data,
    })
  }

  onDownload() {
    this._storage.downloadList(this.clientes, 'Lista de clientes')
  }
}
