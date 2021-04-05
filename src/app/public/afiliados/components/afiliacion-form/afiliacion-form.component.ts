import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AfiliadoModel, AutorizacionesModel, ContactoModel, CorrespondenciaModel, DatosGeneralesModel, DirectorModel, RepresentanteLegalModel } from '../../afiliados.model';

@Component({
  selector: 'g-afiliados-form',
  templateUrl: './afiliacion-form.component.html',
  styleUrls: ['./afiliacion-form.component.scss'],
})
export class AfiliacionFormComponent implements OnInit {
  // REVIEW La forma de cargarlos los datos con clase hace más simple su iniciación
  public afiliado: AfiliadoModel
  public datosGenerales: DatosGeneralesModel
  public correspondencia: CorrespondenciaModel
  public contacto: ContactoModel
  public representanteLegal: RepresentanteLegalModel
  public director: DirectorModel
  public autorizaciones: AutorizacionesModel

  constructor(public dialog: MatDialog) {

    this.datosGenerales = new DatosGeneralesModel('', '', '', '', '', '', '', '', '', '', '', '')
    this.correspondencia = new CorrespondenciaModel(false, '', '', '', '', '','','')
    this.contacto = new ContactoModel('', '', '', '', '', '')
    this.representanteLegal = new RepresentanteLegalModel('', '', '', '', '', '', '', '', '', '', '', false)
    this.director = new DirectorModel('', '', '', '', '', '', '', '', '', '', '')
    this.autorizaciones = new AutorizacionesModel(false, false, false)
    this.afiliado = new AfiliadoModel(
      this.datosGenerales,
      this.correspondencia,
      this.contacto,
      this.representanteLegal,
      this.director,
      this.autorizaciones,
    )
  }

  ngOnInit(): void {}

  OpenPrivacidad(): void {
    const dialogRef = this.dialog.open(DialogPrivacidad);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      // TODO Capturar el evento de aceptar en el model y validar el formulario
    });
  }
  OpenRetencion(): void {
    const dialogRef = this.dialog.open(DialogRetencion);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-privacidad',
  templateUrl: 'dialog-privacidad.html',
})
export class DialogPrivacidad {
  // REVIEW agregar las importaciones para el manejo de la data en el DIALOG
  constructor(
    public dialog_: MatDialogRef<DialogPrivacidad>
  ){}
}

@Component({
  selector: 'dialog-retencion',
  templateUrl: 'dialog-retencion.html',
})
export class DialogRetencion {}
