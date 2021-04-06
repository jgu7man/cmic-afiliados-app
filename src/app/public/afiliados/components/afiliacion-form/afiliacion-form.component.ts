import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GdevCache } from '@jgu7man/gdev-tools';
import { AfiliadoModel, AutorizacionesAfiliado, iContactoAfiliado, DatosGeneralesAfiliado,  RepresentanteAfiliado, iDireccion, DireccionAfiliado, ContactoAfiliado, iUserAfiliado } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';

@Component({
  selector: 'g-afiliados-form',
  templateUrl: './afiliacion-form.component.html',
  styleUrls: ['./afiliacion-form.component.scss'],
})
export class AfiliacionFormComponent implements OnInit {
  // public user: iUserAfiliado

  public contactoModel: iContactoAfiliado
  public dirPublica: iDireccion
  // MODEL
  public afiliado: AfiliadoModel
  public generales: DatosGeneralesAfiliado
  public direccion: DireccionAfiliado
  public contacto: ContactoAfiliado
  public representanteLegal: RepresentanteAfiliado
  public director: RepresentanteAfiliado
  public autorizaciones: AutorizacionesAfiliado
  public addCorrespondencia: boolean = false
  public director_igual_legal: boolean = false

  constructor(
    public dialog: MatDialog,
    public afiliados_: AfiliadosService,
    private _cache: GdevCache
  ) {
    // Se obtiene el usuario del cache
    // this.user = this._cache.getDataKey<iUserAfiliado>('user')
    this.dirPublica = {
      calle: '',
      num_ext: '',
      num_int: '',
      colonia: '',
      codigo_postal: '',
      entidad_federativa: '',
      municipio_alcaldia: '',
    }
    this.contactoModel = {
      lada_telefono:'',
      telefono:'',
      lada_celular:'',
      celular:'',
      email:'',
      pagina_web:'',
    }
    this.generales = new DatosGeneralesAfiliado('', '', '', '', '', )
    this.direccion = { publica: this.dirPublica, correspondencia: this.dirPublica }
    this.contacto = {mostrar_en_directorios: false, ...this.contactoModel}
    this.representanteLegal = new RepresentanteAfiliado('', '', '', '', '', '', this.contactoModel)
    this.director = new RepresentanteAfiliado('', '', '', '', '', '', this.contactoModel)
    this.autorizaciones = {
      retencion_para_capacitacion: false,
      aviso_privacidad: false
    }
    this.afiliado = new AfiliadoModel(
      this.generales,
      this.direccion,
      this.contactoModel,
      this.representanteLegal,
      this.director,
      this.autorizaciones,
    )
  }

  ngOnInit(): void {}

  OpenPrivacidad(): void {
    const dialogRef = this.dialog.open(DialogPrivacidad);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.autorizaciones.aviso_privacidad = true
    });
  }
  OpenRetencion(): void {
    const dialogRef = this.dialog.open(DialogRetencion);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.autorizaciones.retencion_para_capacitacion = true
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
