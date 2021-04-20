import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { DireccionAfiliadoModel, iDireccion } from '../../../models/afiliados.model';

@Component({
  selector: 'g-direccion-form',
  templateUrl: './direccion-form.component.html',
  styleUrls: ['./direccion-form.component.scss']
})
export class DireccionFormComponent implements OnInit {


  // DEFINING FORMS MODEL
  dirPublicaForm: FormGroup = new FormGroup({
    calle: new FormControl( '', [Validators.required]),
    num_ext: new FormControl( '', [Validators.required]),
    num_int: new FormControl( '', ),
    colonia: new FormControl( '', [Validators.required]),
    codigo_postal: new FormControl( '', [Validators.required]),
    municipio_alcaldia: new FormControl( '', [Validators.required]),
    entidad_federativa: new FormControl( '', [Validators.required]),
  })

  correspondenciaForm: FormGroup = new FormGroup({
    calle: new FormControl(''),
    num_ext: new FormControl(''),
    num_int: new FormControl(''),
    colonia: new FormControl(''),
    codigo_postal: new FormControl(''),
    municipio_alcaldia: new FormControl(''),
    entidad_federativa: new FormControl(''),
  })

  direccionForm: FormGroup = new FormGroup({
    publica: this.dirPublicaForm,
    correspondencia: this.correspondenciaForm
  })


  // LISTEN FOR FORM INJECT
  private _form: BehaviorSubject<DireccionAfiliadoModel> =
    new BehaviorSubject({ ...this.direccionForm.value});
  @Input() set form(form: DireccionAfiliadoModel | undefined) { if (form) this._form.next(form); }
  get form() { return this._form.getValue()}


  addCorrespondencia: boolean = false
  @Output() changes: EventEmitter<DireccionAfiliadoModel> = new EventEmitter();
  @Output() invalid: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this._form.pipe(take(2)).subscribe(form => {
      this.direccionForm.setValue(form)
      if (form.correspondencia) {
        Object.keys(form.correspondencia).forEach(key => {
          if (form.correspondencia[key as keyof iDireccion] != '')
            this.addCorrespondencia = true
        })
      }
      this.direccionForm.markAsPristine()
      this.invalid.emit(true)
    })

  }

  ngOnInit(): void {
    this.direccionForm.valueChanges.subscribe(() => {
      this.changes.emit(this.direccionForm.value)
      this.invalid.emit(
        this.direccionForm.invalid
          && this.direccionForm.pristine
          ? true : false
      )
    })
  }

}
