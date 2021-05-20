import { Component, OnInit } from '@angular/core';
import { AfiliadosService } from '../../services/afiliados.service';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { ActivatedRoute } from '@angular/router';
import { AfiliadoModel, AfiliadoProperty, emptyAfiliado } from '../../models/afiliados.model';
import { MxAlert } from '@marxa/devkit';
import { FormControl, FormGroup } from '@angular/forms';
import { PerfilService } from '../../services/perfil.service';
import { iAdtionalInfo, iPerfil, iPersonal } from '../../models/perfiles.model';
import { MxCache } from '@marxa/devkit';
import { Location } from '@angular/common';

@Component({
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.scss']
})
export class EditarPerfilComponent implements OnInit {

  RFC: string
  afiliado: AfiliadoModel = emptyAfiliado
  perfilForm = new FormGroup({
    primerAfiliacion: new FormControl(new Date().getFullYear()),
    capFinanciera: new FormControl(0)
  })

  personal: iPersonal = {} as iPersonal

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
      this.afiliados_.getPerfil(this.RFC).subscribe((data) => {
        console.log( data )
        // TODO Poner un estado CARGANDO y apagarlo aquí
        if (data) {
          this.afiliado = data;
          this.RFC = data.datos_generales?.RFC as string;
          let { primerAfiliacion, servicios, capFinanciera } = this.afiliado.perfil as iPerfil
          console.log( { primerAfiliacion, servicios, capFinanciera } )
          this.perfilForm.patchValue({ primerAfiliacion, capFinanciera })
          this.servicios = servicios ? servicios : []
        }
        else {
          this._alert.message('No se encontró el perfil')
        }
      });
   }

  ngOnInit(): void {
    if (this.afiliado.perfil?.servicios)
      this.servicios = this.afiliado.perfil?.servicios
    if (this.afiliado.perfil?.primerAfiliacion){
      this.perfilForm.patchValue({
        primerAfiliacion: this.afiliado.perfil?.primerAfiliacion
      })
    }

  }



  catchYear(year: any) {
    this.perfilForm.patchValue({primerAfiliacion: year})
  }


  saveData(field: string, form: FormGroup): void {
    console.log(form.value)
    if (!form.value.primerAfiliacion)
    this.perfilForm.patchValue({primerAfiliacion: new Date()})
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

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(servicio:string): void {
    const index = this.servicios.indexOf(servicio);

    if (index >= 0) {
      this.servicios.splice(index, 1);
    }
  }

}
