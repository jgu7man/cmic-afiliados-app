import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DatosGeneralesAfiliado } from '../../../models/afiliados.model';

@Component({
  selector: 'g-datos-generales-form',
  templateUrl: './datos-generales-form.component.html',
  styleUrls: ['./datos-generales-form.component.scss']
})
export class DatosGeneralesFormComponent implements OnInit {

  generalesForm: FormGroup = new FormGroup({
    RFC: new FormControl('', [Validators.required]),
    comercial_nombre: new FormControl(''),
    moral_nombre: new FormControl(''),
  })


  public RFC$: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set RFC(rfc: string | undefined) { if (rfc) this.RFC$.next(rfc); }
  // get RFC() { return this._RFC.getValue() }

  private _form: Subject<DatosGeneralesAfiliado> = new Subject();
  @Input() set form(variable: DatosGeneralesAfiliado | undefined)
  { this._form.next(variable); }


  @Output() changes: EventEmitter<DatosGeneralesAfiliado> = new EventEmitter()
  @Output() invalid: EventEmitter<boolean> = new EventEmitter()

  constructor() {

    this.RFC$.pipe(filter(rfc => !!rfc)).subscribe(rfc => {
      if (rfc && rfc.length === 13) {
        this.generalesForm = new FormGroup({
          RFC: new FormControl('', [Validators.required]),
          comercial_nombre: new FormControl(''),
          fisica_nombre: new FormControl('', [Validators.required]),
          fisica_apellido_pat: new FormControl('', [Validators.required]),
          fisica_apellido_mat: new FormControl('', [Validators.required]),
        })
      }
      this.generalesForm.patchValue({RFC: rfc})
    })
    this._form.pipe( filter(data => !!data), take(2)).subscribe(data => {
      console.log( data.fisica_apellido_mat )
      if (data) {
        this.generalesForm.setValue(data)
        this.generalesForm.markAsPristine()
        this.invalid.emit(true)
      }
    })
  }

  ngOnInit(): void {
    this.generalesForm.valueChanges.subscribe((changes) => {
      this.changes.emit(this.generalesForm.value)
      this.invalid.emit(
        this.generalesForm.invalid && this.generalesForm.pristine
        ? true : false
      )
    })
  }

}
