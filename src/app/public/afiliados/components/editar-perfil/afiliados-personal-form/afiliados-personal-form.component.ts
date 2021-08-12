import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxLoading } from '@marxa/devkit';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { iPersonal } from '../../../models/perfiles.model';
import { AfiliadosService } from '../../../services/afiliados.service';
import { PerfilService } from '../../../services/perfil.service';

@Component({
  selector: 'g-afiliados-personal-form',
  templateUrl: './afiliados-personal-form.component.html',
  styleUrls: ['./afiliados-personal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AfiliadosPersonalFormComponent implements OnInit {

  @Input() RFC: string = ''

  personalForm: FormGroup  = new FormGroup({
    planta_fija: new FormControl('', [Validators.required]),
    capacidad_proyecto: new FormControl('', [Validators.required]),
  });


  constructor(
    private _afiliados: AfiliadosService,
    private _perfil: PerfilService,
    private _loading: MxLoading
  ) {
    this._perfil.getInfoDoc('adicional.personal')
      .then( async data => {
        if (data) {
          this.personalForm.patchValue( data )
          console.log( this.personalForm.pristine )
          await this._loading.waitFor(2000)
          this.personalForm.markAsPristine()
          console.log( this.personalForm.pristine )
        }
      })
  }

  async ngOnInit() {

  }

  onSubmit() {
    this._afiliados.patch(
      'adicional.personal',
      this.personalForm.value,
    )
    this.personalForm.markAsPristine()
  }

}
