import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { RepresentanteAfiliado } from '../../../models/afiliados.model';

@Component({
  selector: 'g-representante-form',
  templateUrl: './representante-form.component.html',
  styleUrls: ['./representante-form.component.scss']
})
export class RepresentanteFormComponent implements OnInit {

  representanteForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido_pat: new FormControl('', [Validators.required]),
    apellido_mat: new FormControl(''),
    titulo: new FormControl('', [Validators.required]),
    sexo: new FormControl(''),
    fecha_nacimiento: new FormControl(''),
    contacto: new FormGroup({
      telefono: new FormControl(''),
      celular: new FormControl(''),
      email: new FormControl(''),
      pagina_web: new FormControl('')
    })
  })

  private _form: BehaviorSubject<RepresentanteAfiliado> = new BehaviorSubject({
    ...this.representanteForm.value
  });
  @Input() set form(form: RepresentanteAfiliado | undefined) {
    if (form) this._form.next(form);
   }

   @Output() changes: EventEmitter<RepresentanteAfiliado> = new EventEmitter()
   @Output() invalid: EventEmitter<boolean> = new EventEmitter()

  constructor() {
    this._form.pipe(take(2)).subscribe(form => {
      this.representanteForm.setValue(form)
      this.representanteForm.markAsPristine()
      this.invalid.emit(true)
    })
  }

  ngOnInit(): void {
    this.representanteForm.valueChanges.subscribe(() => {
      this.changes.emit(this.representanteForm.value)
      this.invalid.emit(
        this.representanteForm.invalid
        && this.representanteForm.pristine
        ? true : false
      )
    })
  }

}
