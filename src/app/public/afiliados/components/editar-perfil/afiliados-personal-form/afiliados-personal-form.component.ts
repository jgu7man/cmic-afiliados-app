import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { iPersonal } from '../../../models/perfiles.model';
import { AfiliadosService } from '../../../services/afiliados.service';

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

  private _personal: BehaviorSubject<iPersonal> = new BehaviorSubject({
    ...this.personalForm.value
  });
  @Input() set personal(person: iPersonal) { this._personal.next(person); }

  constructor(
    private _afiliados: AfiliadosService,
  ) {

   }

  ngOnInit(): void {
    this._personal.subscribe(personal => {
      this.personalForm.setValue(personal)
    })

  }

  onSubmit() {
    this._afiliados.savePartialAfiliado(
      'adicional.personal',
      this.personalForm.value,
      this.RFC
    )
  }

}
