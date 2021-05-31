import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { iMensaje } from 'src/app/public/pages/contacto/mensajes.model';
import firebase from 'firebase/app'
import { MxAlert } from '@marxa/devkit';

@Component({
  selector: 'g-admin-contacto',
  templateUrl: './admin-contacto.component.html',
  styleUrls: ['./admin-contacto.component.scss']
})
export class AdminContactoComponent implements OnInit {

  mensajes: iMensaje[] = []
  displayedColumns = [
    'enviado', 'nombre', 'options'
  ]
  @ViewChild(MatSort) sort?: MatSort;
  dataSource = new MatTableDataSource(this.mensajes);

  currentPage: iMensaje[] = []
  pageSize: number = 10
  first: number = 0
  page: number = 1

  constructor(
    private _paginator: MatPaginatorIntl,
    private _dialog: MatDialog,
    private _afs: AngularFirestore,
  ) {
    this._afs.collection<iMensaje>('contacto')
      .valueChanges().subscribe(list => {
      this.mensajes = list
    })
    this._paginator.itemsPerPageLabel="Elementos por página"
    this._paginator.lastPageLabel="Última página"
    this._paginator.nextPageLabel="Siguiente página"
    this._paginator.previousPageLabel = "Página anterior"
  }

  ngOnInit(): void {
    this.currentPage = this.mensajes.slice(this.first, this.first + this.pageSize)
  }

  ngAfterViewInit() {
    if(this.sort) this.dataSource.sort = this.sort;
  }

  onPageEvent(event: PageEvent) {
    console.log( event )
    this.pageSize = event.pageSize
    this.page = event.pageIndex
    this.first = event.pageIndex * this.pageSize
    this.currentPage = this.mensajes.slice(this.first, this.first + this.pageSize)
  }

  toDate(date: Date | firebase.firestore.Timestamp) {
    return 'seconds' in date ? new Date(date.seconds * 1000) : date
  }

  seeRequest(data: any) {
    this._dialog.open(DialogContactoMensajeComponent, {
      minHeight: '50%',
      minWidth: '50%',
      data,
    })
  }

}


@Component({
  templateUrl: './dialog-contacto-mensaje.component.html',
  styleUrls: ['./admin-contacto.component.scss']
})
export class DialogContactoMensajeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public mensaje: iMensaje,
    public dialog: MatDialogRef<DialogContactoMensajeComponent>,
    public afs: AngularFirestore,
    private _alert: MxAlert,
  ) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.afs.collection('contacto')
      .doc(this.mensaje.id)
      .delete()
      .then(() => {this._alert.notify('Mensaje eliminado')})
  }

}
