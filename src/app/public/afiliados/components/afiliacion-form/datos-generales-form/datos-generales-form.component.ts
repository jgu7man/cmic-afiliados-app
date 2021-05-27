import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, interval, of, Subject, Subscription } from 'rxjs';
import { concatMap, delay, distinctUntilKeyChanged, filter, finalize, startWith, take, takeUntil, takeWhile } from 'rxjs/operators';
import { DatosGeneralesModel } from '../../../models/afiliados.model';

@Component({
  selector: 'g-datos-generales-form',
  templateUrl: './datos-generales-form.component.html',
  styleUrls: ['./datos-generales-form.component.scss']
})
export class DatosGeneralesFormComponent implements OnInit, OnDestroy {

  generalesForm: FormGroup = new FormGroup({
    RFC: new FormControl('', [Validators.required]),
    comercial_nombre: new FormControl('', [Validators.required]),
    moral_nombre: new FormControl('', [Validators.required]),
    slug: new FormControl('')
  })


  public RFC$: BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set RFC(rfc: string | undefined) { if (rfc) this.RFC$.next(rfc); }
  // get RFC() { return this._RFC.getValue() }

  private _form: Subject<DatosGeneralesModel> = new Subject();
  @Input() set form(variable: DatosGeneralesModel | undefined)
  { this._form.next(variable); }

  @Output() changes: EventEmitter<DatosGeneralesModel> = new EventEmitter()
  @Output() invalid: EventEmitter<boolean> = new EventEmitter()

  changesSubscription?: Subscription
  rfcSubscription?: Subscription
  formSubscription?: Subscription

  constructor() {

    this.defineForm()


  }

  ngOnInit(): void {
    this.changesSubscription = this.subscribeOnChanges()
    this.listenOutputForm()
  }

  listenOutputForm() {
    this.formSubscription = this._form.pipe(
      distinctUntilKeyChanged('RFC'),
      concatMap(data => {
        return  of(data)
      }),
      // takeWhile(data => {
      //   console.log(data)
      //   return !data
      // })
    ).subscribe(data => {
      if (data) {
        console.log( data )
        this.RFC$.next(data.RFC)
        this.generalesForm.patchValue(data)
        this.generalesForm.markAsPristine()
        this.invalid.emit(true)
      }
    })
  }


  defineForm() {
    this.rfcSubscription =
    this.RFC$.pipe(filter(rfc => !!rfc)).subscribe(rfc => {
      if (rfc && rfc.length === 13) {
        this.generalesForm.addControl(
          'fisica_nombre', new FormControl('', [Validators.required])
        )
        this.generalesForm.addControl(
          'fisica_apellido_pat', new FormControl('', [Validators.required])
        )
        this.generalesForm.addControl(
          'fisica_apellido_mat', new FormControl('', [Validators.required])
        )
        this.generalesForm.removeControl('moral_nombre')
      } else {
        this.generalesForm.removeControl('fisica_nombre')
        this.generalesForm.removeControl('fisica_apellido_pat')
        this.generalesForm.removeControl('fisica_apellido_mat')
        this.generalesForm.addControl(
          'moral_nombre', new FormControl('', [Validators.required])
        )
      }
      this.generalesForm.patchValue({ RFC: rfc })

    })
  }

  subscribeOnChanges() {

    return this.generalesForm.valueChanges
      .pipe(delay(1000),startWith(true))
      .subscribe((changes) => {
        let nombre = this.generalesForm.get('comercial_nombre')
        if (nombre) {
          let slug = nombre.value.replace(/\s+/g, '-').toLowerCase();
          this.generalesForm.patchValue({slug})
        }

        this.changes.emit(this.generalesForm.value)
        this.invalid.emit(
          this.generalesForm.invalid || this.generalesForm.pristine
        )
    })
  }


  ngOnDestroy() {
    if (this.changesSubscription) this.changesSubscription.unsubscribe()
    if (this.rfcSubscription) this.rfcSubscription.unsubscribe()
    if (this.formSubscription) this.formSubscription.unsubscribe()
  }

}
