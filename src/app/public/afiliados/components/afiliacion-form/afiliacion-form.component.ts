import { emptyAfiliado, iAfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GdevCache } from 'gdev-cache';
import { AfiliadoModel, iContacto, DatosGeneralesModel,  RepresentanteAfiliado, iDireccion, DireccionAfiliadoModel, ContactoAfiliado, iManager, AfiliadoProperty } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';
import {take} from 'rxjs/operators'
@Component({
  selector: 'g-afiliados-form',
  templateUrl: './afiliacion-form.component.html',
  styleUrls: ['./afiliacion-form.component.scss'],
})
export class AfiliacionFormComponent implements OnInit {
  public user: iManager

  // MODEL
  public afiliado: AfiliadoModel = emptyAfiliado
  public addCorrespondencia: boolean = false
  public director_igual_legal: boolean = false

  public RFC: string

  constructor(
    public dialog: MatDialog,
    public afiliados_: AfiliadosService,
    private _cache: GdevCache
  ) {
    // Se obtiene el usuario del cache
    let user = this._cache.getDataKey<iManager>('user') as iManager
      this.user = user
      this.RFC = user.RFC

  }

  ngOnInit(): void { }

  onChanges(form: AfiliadoProperty, data: any) {
    console.log( form, data )
    this.afiliado[form] = data
    console.log( this.afiliado )
    console.log( this.afiliado[form] )
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
