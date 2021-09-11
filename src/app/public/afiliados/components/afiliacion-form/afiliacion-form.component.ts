import { emptyAfiliado, iAfiliadoModel } from 'src/app/public/afiliados/models/afiliados.model';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MxCache, MxLoading } from '@marxa/devkit';
import { AfiliadoModel, iContacto, DatosGeneralesModel,  RepresentanteAfiliado, iDireccion, DireccionAfiliadoModel, ContactoAfiliado, iManager, AfiliadoProperty } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';
import {delay, first, take, takeWhile} from 'rxjs/operators'
import { of } from 'rxjs';
import { MxAuth } from '@marxa/auth';
import { ManagersService } from '../../services/managers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatVerticalStepper } from '@angular/material/stepper';
@Component({
  selector: 'g-afiliados-form',
  templateUrl: './afiliacion-form.component.html',
  styleUrls: ['./afiliacion-form.component.scss'],
})
export class AfiliacionFormComponent implements OnInit, AfterViewInit {
  public user: iManager

  // MODEL
  public afiliado: AfiliadoModel = emptyAfiliado
  public addCorrespondencia: boolean = false
  public director_igual_legal: boolean = false
  public director_invalid: boolean = true

  public RFC: string
  public edit?: number

  @ViewChild('stepper') private stepper!: MatVerticalStepper

  constructor(
    public dialog: MatDialog,
    public afiliados_: AfiliadosService,
    public location: Location,
    private _cache: MxCache,
    private _auth: MxAuth,
    private _managers: ManagersService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _loading: MxLoading,
  ) {
    // Se obtiene el usuario del cache
    let user = this._cache.getDataKey<iManager>('user') as iManager
    this.user = user
    this.RFC = this._route.snapshot.params[ 'RFC' ]
    this.edit = this._route.snapshot.queryParams[ 'edit' ]
    if (this.edit) this.edit = +this.edit
    console.log( this.edit )

    this._auth.user$.pipe( takeWhile( user => user ) ).subscribe( user => {
      // console.log( user )
      if (!user) this._router.navigate(['/'])
      else this._managers.retriveManager( user.email )
        .pipe(takeWhile(user => !user, true))
        .subscribe( manager => {
          // console.log( manager )
          if ( !manager || manager.RFC != this.RFC ) {
            let admin = this._cache.getDataKey( 'admin' )
            if (!admin) this._router.navigate( [ '/' ] )
          }
        })
    })
  }

  ngOnInit(): void {
    this.afiliados_.getPerfil( this.RFC )
      .pipe(first())
      .subscribe( ( data ) => {
        // console.log( data )
        if ( data ) this.afiliado = data
      } )
    }

  async ngAfterViewInit() {
    let steps = this.stepper.steps.toArray()
    await this._loading.waitFor( 3000 )
    if ( this.edit !== undefined ) {
      this.stepper.selected = steps[ this.edit ]
    }
  }

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
