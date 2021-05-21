import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { ManagersService } from '../../services/managers.service';

@Component({
  templateUrl: './afiliados-create.component.html',
  styleUrls: ['./afiliados-create.component.scss']
})
export class AfiliadosCreateComponent implements OnInit {

  managerForm: FormGroup
  matcher = new MyErrorStateMatcher();
  hide = true;

constructor(
  public formBuilder: FormBuilder,
  private _route: ActivatedRoute,
  private _router: Router,
  private _alert: MxAlert,
  private _managers: ManagersService
) {
  let { email, RFC } = this._route.snapshot.queryParams

  this.managerForm = this.formBuilder.group({
    RFC: [''],
    email: [''],
    nombre: ['', [Validators.required]],
    paterno: ['', [Validators.required]],
    materno: [''],
    contrasena: ['', [Validators.required]],
    confcontrasena: ['', [Validators.required]],
    },
    { validator: this.checkPasswords }
  )

  if (email && RFC) {
    this.managerForm.patchValue({RFC, email})
  } else {
    this._alert.message('No se encontró la cuenta. Revisa el enlace o ponte en contacto con la CMIC').subscribe(()=> { this._router.navigate(['/'])})
  }

}

  ngOnInit(): void {
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.contrasena.value;
    let confirmPass = group.controls.confcontrasena.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  onSubmit() {
    this._managers.createManager(this.managerForm.getRawValue())
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent?.dirty);
    const invalidParent = !!(
      control &&
      control.parent &&
      control.parent.invalid &&
      control.parent.dirty
    );
    return invalidCtrl || invalidParent;
  }
}
