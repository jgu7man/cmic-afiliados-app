import { Component, OnInit } from '@angular/core';
import { AfiliadosService } from '../../services/afiliados.service';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { AfiliadoModel, AfiliadoProperty, emptyAfiliado } from '../../models/afiliados.model';
import { MxAlert } from '@marxa/devkit';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../services/perfil.service';
import { iAdtionalInfo, iPerfil, iPersonal } from '../../models/perfiles.model';
import { MxCache } from '@marxa/devkit';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';

@Component({
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  RFC: string
  afiliado: AfiliadoModel = emptyAfiliado
  perfilForm = new FormGroup({
    afiliacionYear: new FormControl(new Date().getFullYear()),
    capFinanciera: new FormControl(0)
  })

  personal: iPersonal = {} as iPersonal

  chipsInput: FormControl = new FormControl('', [Validators.required])
  servicios: string[] = []
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];


  constructor(
    public afiliados_: AfiliadosService,
    private _route: ActivatedRoute,
    private _alert: MxAlert,
    public  perfil_: PerfilService,
    private _cache: MxCache,
    public location_: Location  ,
  ) {
    this.RFC = this._cache.getDataKey<string>('rfc') as string;
    this.afiliados_.getPerfil( this.RFC )
      .pipe(first())
      .subscribe( ( data ) => {
        // console.log( data )
        // TODO Poner un estado CARGANDO y apagarlo aquí
        if (data) {
          this.afiliado = data;
          this.RFC = data.datos_generales?.RFC as string;
          if ( this.afiliado.perfil ) {
            let { afiliacionYear: afiliacionYear, servicios, capFinanciera } = this.afiliado.perfil as iPerfil
            // console.log( { afiliacionYear, servicios, capFinanciera } )
            if ( afiliacionYear ) this.perfilForm.patchValue( { afiliacionYear } )
            if ( capFinanciera ) this.perfilForm.patchValue( { capFinanciera } )
            console.log( servicios )
            if ( servicios ) this.servicios = servicios
          }
        }
        else {
          this._alert.message('No se encontró el perfil')
        }
      });
   }

  ngOnInit(): void {
    if (this.afiliado.perfil?.servicios)
      this.servicios = this.afiliado.perfil?.servicios
    if (this.afiliado.perfil?.afiliacionYear){
      this.perfilForm.patchValue({
        afiliacionYear: this.afiliado.perfil.afiliacionYear > 0
          ? this.afiliado.perfil.afiliacionYear : new Date().getFullYear()
      })
    }

  }



  catchYear( year: any ) {
    let yearCtrl = this.perfilForm.controls['afiliacionYear']
    yearCtrl.setValue( year )
    yearCtrl.markAsDirty()
  }


  saveData(field: string, form: FormGroup): void {
    console.log( form.value )
    let yearCtrl = form.controls['afiliacionYear']
    if (yearCtrl.pristine) yearCtrl.setValue(0)
    this.perfil_.updateInfoDoc(field, form.value)
    form.markAsPristine()
  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.servicios.push(value.trim());
    }

    this.chipsInput.markAsDirty()
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(servicio:string): void {
    const index = this.servicios.indexOf(servicio);
    this.chipsInput.markAsDirty()
    if (index >= 0) {
      this.servicios.splice(index, 1);
    }
  }

  updateServicios() {
    this.chipsInput.markAsPristine()
    this.perfil_.updateInfoDoc('perfil.servicios', this.servicios)
  }

}
