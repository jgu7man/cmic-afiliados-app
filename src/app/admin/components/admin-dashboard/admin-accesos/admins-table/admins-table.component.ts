import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DialogRevokeAccesoComponent } from '../dialog-revoke-acceso/dialog-revoke-acceso.component';
import { iAdmin } from 'src/app/admin/models/admin.model';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  selector: 'g-admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.scss']
})
export class AdminsTableComponent implements OnInit {
  admins: iAdmin[] = []
  displayedColumns = [
    'email', 'lastAccess', 'access', 'options'
  ]
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource(this.admins);

  currentPage: iAdmin[] = []
  pageSize: number = 10
  first: number = 0
  page: number = 1
  constructor(
    private _paginator: MatPaginatorIntl,
    private _dialog: MatDialog,
    private _admins: AdminService
  ) {
    this._admins.getList().subscribe(list => {
      this.admins = list
    })
    this._paginator.itemsPerPageLabel="Elementos por página"
    this._paginator.lastPageLabel="Última página"
    this._paginator.nextPageLabel="Siguiente página"
    this._paginator.previousPageLabel = "Página anterior"
  }

  ngOnInit(): void {
    this.currentPage = this.admins.slice(this.first, this.first + this.pageSize)
  }

  ngAfterViewInit() {
    if(this.sort) this.dataSource.sort = this.sort;
  }

  onPageEvent(event: PageEvent) {
    console.log( event )
    this.pageSize = event.pageSize
    this.page = event.pageIndex
    this.first = event.pageIndex * this.pageSize
    this.currentPage = this.admins.slice(this.first, this.first + this.pageSize)
  }

  toRevoke(item: any) {
    let path = `admins/${item.uid}`
    this._dialog.open(DialogRevokeAccesoComponent, {
      data: path
    })
  }
}
