import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    hombres: new FormControl('',),
    mujeres: new FormControl('',),
  });


  constructor(
    private _afiliados: AfiliadosService,
    private _perfil: PerfilService
  ) {
    this._perfil.getInfoDoc('adicional.personal')
      .then(data => {
        if (data) {
          this.personalForm.patchValue(data)
          this.personalForm.markAsPristine()
        }
      })
   }

  ngOnInit(): void {

  }

  onSubmit() {
    this._afiliados.savePartialAfiliado(
      'adicional.personal',
      this.personalForm.value,
      this.RFC
    )
    this.personalForm.markAsPristine()
  }

}
