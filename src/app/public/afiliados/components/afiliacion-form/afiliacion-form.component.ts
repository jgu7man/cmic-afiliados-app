import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'g-afiliados-form',
  templateUrl: './afiliacion-form.component.html',
  styleUrls: ['./afiliacion-form.component.scss']
})
export class AfiliacionFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  first:string = ''

  constructor(private _formBuilder: FormBuilder) {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.firstFormGroup.hasError('')
  }


  ngOnInit(): void {
  }

  get errors() {
    console.log( this.firstFormGroup.errors )
    return
  }

}
