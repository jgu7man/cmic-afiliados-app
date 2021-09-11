import { ContactoAfiliado } from './../../../models/afiliados.model';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { iContacto } from '../../../models/afiliados.model';
import { delay, distinctUntilKeyChanged, startWith, take } from 'rxjs/operators';
import { MxText } from '@marxa/devkit';

@Component({
  selector: 'g-contacto-form',
  templateUrl: './contacto-form.component.html',
  styleUrls: ['./contacto-form.component.scss']
})
export class ContactoFormComponent implements OnInit, OnDestroy {

  contactoForm: FormGroup = new FormGroup({
    area_tel: new FormControl(52),
    telefono: new FormControl('', [Validators.minLength(10), Validators.maxLength(10)]),
    area_cel: new FormControl(52),
    celular: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
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

  private formSubscription: Subscription
  private changesSubscription!: Subscription

  constructor(
    public text: MxText
  ) {
    this.formSubscription = this._form.pipe(
      distinctUntilKeyChanged('email')
    ).subscribe( form => {
      // console.log( form )
      this.contactoForm.patchValue(form)
      this.contactoForm.markAsPristine()
      this.invalid.emit(true)
    })
  }

  ngOnInit(): void {
    this.changesSubscription = this.contactoForm.valueChanges
    .pipe(delay(1000), startWith(true))
      .subscribe( ( changes ) => {
        // console.log( changes )
      this.changes.emit(this.contactoForm.value)
      this.invalid.emit(
        this.contactoForm.invalid || this.contactoForm.pristine

      )
    })
  }

  ngOnDestroy() {
    this.formSubscription.unsubscribe()
    this.changesSubscription.unsubscribe()
  }

}
