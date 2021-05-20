import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxText } from '@marxa/devkit';
import { BehaviorSubject } from 'rxjs';
import { delay, distinctUntilKeyChanged, startWith, take } from 'rxjs/operators';
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
    titulo: new FormControl(''),
    sexo: new FormControl(''),
    fecha_nacimiento: new FormControl(''),
    contacto: new FormGroup({
      area_tel: new FormControl(52),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      area_cel: new FormControl(52),
      celular: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
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

  constructor(
    public text: MxText
  ) {
    this._form.pipe(
      distinctUntilKeyChanged('nombre')
    ).subscribe(form => {
      this.representanteForm.patchValue(form)
      this.representanteForm.markAsPristine()
      this.invalid.emit(true)
    })
  }

  ngOnInit(): void {
    this.representanteForm.valueChanges
    .pipe(delay(1000), startWith(true))
      .subscribe((changes) => {
      this.changes.emit(this.representanteForm.value)
      this.invalid.emit(
        this.representanteForm.invalid || this.representanteForm.pristine

      )
    })
  }

}
