import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { iManager } from 'src/app/public/afiliados/models/afiliados.model';
import { DialogAccesoComponent } from '../dialog-acceso/dialog-acceso.component';
import { DialogRevokeAccesoComponent } from '../dialog-revoke-acceso/dialog-revoke-acceso.component';

@Component({
  selector: 'g-admin-managers-table',
  templateUrl: './admin-managers-table.component.html',
  styleUrls: ['./admin-managers-table.component.scss']
})
export class AdminManagersTableComponent implements OnInit, AfterViewInit {

  @Input() managers: iManager[] = []
  displayedColumns = [
    'email', 'RFC', 'lastAccess', 'access', 'options'
  ]
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource(this.managers);

  currentPage: iManager[] = []
  pageSize: number = 10
  first: number = 0
  page: number = 1
  constructor(
    private _paginator: MatPaginatorIntl,
    private _dialog: MatDialog
  ) {
    this._paginator.itemsPerPageLabel="Elementos por página"
    this._paginator.lastPageLabel="Última página"
    this._paginator.nextPageLabel="Siguiente página"
    this._paginator.previousPageLabel = "Página anterior"
  }

  ngOnInit(): void {
    this.currentPage = this.managers.slice(this.first, this.first + this.pageSize)
  }

  ngAfterViewInit() {
    if(this.sort) this.dataSource.sort = this.sort;
  }

  onPageEvent(event: PageEvent) {
    console.log( event )
    this.pageSize = event.pageSize
    this.page = event.pageIndex
    this.first = event.pageIndex * this.pageSize
    this.currentPage = this.managers.slice(this.first, this.first + this.pageSize)
  }

  onSelect(item: any) {
    let path = `afiliados/${item.RFC}/managers/${item.uid}`
    this._dialog.open(DialogRevokeAccesoComponent, {
      data: path
    })
  }

}
