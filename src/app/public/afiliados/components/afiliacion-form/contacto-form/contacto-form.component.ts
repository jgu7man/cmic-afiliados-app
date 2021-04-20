import { ContactoAfiliado } from './../../../models/afiliados.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { iContacto } from '../../../models/afiliados.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'g-contacto-form',
  templateUrl: './contacto-form.component.html',
  styleUrls: ['./contacto-form.component.scss']
})
export class ContactoFormComponent implements OnInit {

  contactoForm: FormGroup = new FormGroup({
    telefono: new FormControl('', [Validators.required]),
    celular: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    pagina_web: new FormControl(''),
    mostrar_en_directorios: new FormControl(false),
  })

  private _form: BehaviorSubject<ContactoAfiliado> = new BehaviorSubject({
    ...this.contactoForm.value
  });
  @Input() set form(form: ContactoAfiliado | undefined) { if (form) this._form.next(form); }
  @Output() changes: EventEmitter<ContactoAfiliado> = new EventEmitter()
  @Output() invalid: EventEmitter<boolean> = new EventEmitter()

  constructor() {
    this._form.pipe(take(2)).subscribe(form => {
      this.contactoForm.setValue(form)
      this.contactoForm.markAsPristine()
      this.invalid.emit(true)
    })
  }

  ngOnInit(): void {
    this.contactoForm.valueChanges.subscribe(() => {
      this.changes.emit(this.contactoForm.value)
      this.invalid.emit(
        this.contactoForm.invalid && this.contactoForm.pristine
        ? true : false
      )
    })
  }

}
