import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { take } from 'rxjs/operators';
import { AfiliadoModel } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';
import { ManagersService } from '../../services/managers.service';

@Component({
  templateUrl: './afiliados-create.component.html',
  styleUrls: ['./afiliados-create.component.scss']
})
export class AfiliadosCreateComponent implements OnInit, OnDestroy {

  managerForm: FormGroup
  matcher = new MyErrorStateMatcher();
  hide = true;
  empresa?: AfiliadoModel

constructor(
  public formBuilder: FormBuilder,
  private _route: ActivatedRoute,
  private _router: Router,
  private _alert: MxAlert,
  private _managers: ManagersService,
  private _afiliados: AfiliadosService
) {
  let { email, rfc: RFC } = this._route.snapshot.queryParams

  this.managerForm = this.formBuilder.group({
    RFC: [{value: '', disabled:true}],
    email: [{value: '', disabled:true}],
    nombre: ['', [Validators.required]],
    paterno: ['', [Validators.required]],
    materno: [''],
    contrasena: ['', [Validators.required]],
    confcontrasena: ['', [Validators.required]],
    },
    { validator: this.checkPasswords }
  )

  if (email && RFC) {
    this.managerForm.patchValue({ RFC, email })
    this._afiliados.getPerfil( RFC )
      .pipe( take( 1 ) )
      .subscribe( data => {
        // console.log( data )
        this.empresa = data
      } )
  } else {
    this._alert.message( 'No se encontró la cuenta. Revisa el enlace o ponte en contacto con la CMIC' )
      .pipe(take(1))
      .subscribe( ( val ) => {
        // console.log( val )
        this._router.navigate( [ '/' ] )
      } )
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

  ngOnDestroy() {}

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
