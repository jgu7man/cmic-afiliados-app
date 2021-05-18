import { emptyAfiliado, iAfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GdevCache } from 'gdev-cache';
import { AfiliadoModel, iContacto, DatosGeneralesModel,  RepresentanteAfiliado, iDireccion, DireccionAfiliadoModel, ContactoAfiliado, iManager, AfiliadoProperty } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';
import {delay, take, takeWhile} from 'rxjs/operators'
import { of } from 'rxjs';
import { GdevAuthService } from 'gdev-auth';
import { ManagersService } from '../../services/managers.service';
import { Router } from '@angular/router';
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
  public director_invalid: boolean = true

  public RFC: string

  constructor(
    public dialog: MatDialog,
    public afiliados_: AfiliadosService,
    private _cache: GdevCache,
    private _auth: GdevAuthService,
    private _managers: ManagersService,
    private _router: Router
  ) {
    // Se obtiene el usuario del cache
    let user = this._cache.getDataKey<iManager>('user') as iManager
    this.user = user
    this.RFC = user.RFC

    this._auth.user$.pipe(takeWhile(user => user)).subscribe(user => {
      console.log( user )
      if (!user) this._router.navigate(['/'])
      else this._managers.retriveManager(user.email)
        .subscribe(manager => {
          console.log(manager)
          console.log(  manager?.RFC != this.RFC )
          if (!manager || manager.RFC != this.RFC) this._router.navigate(['/'])
        })
    })
  }

  ngOnInit(): void { }

  onChanges(form: AfiliadoProperty, data: any) {
    this.afiliado[form] = data
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
