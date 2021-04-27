import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';

import { Moment } from 'moment';
import * as _moment from 'moment';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MatDatepicker } from '@angular/material/datepicker';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
// import * as moment from 'moment';
const moment = _moment

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY',
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'gdev-year-selector',
  templateUrl: './year-selector.component.html',
  styleUrls: ['./year-selector.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class YearSelectorComponent implements OnInit, OnDestroy{

  yearCtrl: FormControl = new FormControl({value:moment(), disabled: true},[Validators.required])

  private _value: BehaviorSubject<number> =
    new BehaviorSubject( new Date().getFullYear());
  private valSubscription?: Subscription

  @Input() set value(val: number) { this._value.next(val); }
  get value() { return this._value.getValue()}

  @Input() max?: Date
  @Input() min?: Date
  @Input() appearance: 'standard' | 'fill' | 'outline' = 'standard'
  @Input() fieldLabel: string = 'Año'
  @Input() reqErrorLabel: string = 'Este dato es necesario'
  @Output() selected: EventEmitter<any> = new EventEmitter()

  @ViewChild('field') field?: MatFormField

  constructor() {
    // this.field.
   }

  ngOnInit(): void {
    this._value.subscribe(() => {
      if (this.value) {
        console.log( this.value )
        const date: Moment = this.yearCtrl.value
        date.year(this.value)
        this.yearCtrl.setValue(date)
      }
    })
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<Moment>) {
    const date: Moment = this.yearCtrl.value
    date.year(normalizedYear.year())
    this.yearCtrl.setValue(date)
    this.selected.emit(date.year())
    datepicker.close();
  }

  ngOnDestroy() {
    if (this.valSubscription) this.valSubscription.unsubscribe()
  }

}
