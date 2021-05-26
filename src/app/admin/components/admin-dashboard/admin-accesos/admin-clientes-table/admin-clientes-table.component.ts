import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRevokeAccesoComponent } from '../dialog-revoke-acceso/dialog-revoke-acceso.component';
import { iAdmin } from 'src/app/admin/models/admin.model';
import { AdminService } from 'src/app/admin/services/admin.service';
import { iCliente } from 'src/app/public/clientes/models/cliente.model';
import { ClientsService } from 'src/app/public/clientes/services/clients.service';

@Component({
  selector: 'g-admin-clientes-table',
  templateUrl: './admin-clientes-table.component.html',
  styleUrls: ['./admin-clientes-table.component.scss']
})
export class AdminClientesTableComponent implements OnInit {
  clientes: iCliente[] = []
  displayedColumns = [
    'email', 'comercial_nombre', 'lastAccess', 'access', 'options'
  ]
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource(this.clientes);

  currentPage: iCliente[] = []
  pageSize: number = 10
  first: number = 0
  page: number = 1
  constructor(
    private _paginator: MatPaginatorIntl,
    private _dialog: MatDialog,
    private _clientes: ClientsService
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

  toRevoke(item: any) {
    let path = `clientes/${item.uid}`
    this._dialog.open(DialogRevokeAccesoComponent, {
      data: path
    })
  }
}
