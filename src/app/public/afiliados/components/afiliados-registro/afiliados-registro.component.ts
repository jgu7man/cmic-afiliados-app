import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { take } from 'rxjs/operators';

import { iManager } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';
import { ManagersService } from '../../services/managers.service';

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

@Component({
  templateUrl: './afiliados-registro.component.html',
  styleUrls: ['./afiliados-registro.component.scss'],
})
export class AfiliadosRegistroComponent implements OnInit {
  afiliado: FormGroup;

  hide = true;
  matcher = new MyErrorStateMatcher();
  rfcCtrl: FormControl
  invitado: boolean = false

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _afiliadosService: AfiliadosService,
    private _router: Router,
    private _managers: ManagersService,
    private _route: ActivatedRoute,
    private _alert: MxAlert,
  ) {
    let { email, rfc } = this._route.snapshot.queryParams

    this._managers.current$.pipe(take(1)).subscribe(user => {
      console.log( 'ejecuta' )
      if (user) { this._router.navigate(['/afiliados']) }
    })
    this.afiliado = this.formBuilder.group(
      {
        RFC: this.rfcCtrl = new FormControl( '', [Validators.required, Validators.minLength(12), Validators.maxLength(13), this.validateSymbols]),
        email: ['', [Validators.required, Validators.email]],
        nombre: ['', [Validators.required]],
        paterno: ['', [Validators.required]],
        materno: ['', [Validators.required]],
        contrasena: ['', [Validators.required]],
        confcontrasena: ['', [Validators.required]],
        aviso_privacidad: [false, Validators.requiredTrue],
      },
      { validator: this.checkPasswords }
    );

    if (email) {
      this.afiliado.patchValue({ email })
      this.afiliado.get('email')?.disable()
    }
    if (email && rfc) {
      this.afiliado.patchValue({ RFC: rfc })
      this.afiliado.get('RFC')?.disable()
    }
  }
  onSubmit(): void {

    this._afiliadosService.regist(
      this.afiliado.value as iManager
    );
  }
  checkPasswords(group: FormGroup) {
    let pass = group.controls.contrasena.value;
    let confirmPass = group.controls.confcontrasena.value;
    return pass === confirmPass ? null : { notSame: true };
  }

  //.pipe(take(1))
  OpenPrivacidadRegistro(): void {
    const dialogRef = this.dialog.open(DialogPrivacidadRegistro);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.afiliado.controls.aviso_privacidad.setValue(true);
      }
    });
  }

  validateSymbols(control: AbstractControl) {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (format.test(control.value) ) {
      return { invalidFormat: true };
    }
    return null;
  }

  preventSpaces(e:any) {
    if (e.which === 32)
      return false;
    else {
      return
    }
  }

  ngOnInit(): void {}
}




@Component({
  selector: 'dialog-privacidad',
  templateUrl: 'dialog-privacidad-registro.html',
})
export class DialogPrivacidadRegistro {
  // REVIEW agregar las importaciones para el manejo de la data en el DIALOG
  constructor(public dialog_: MatDialogRef<DialogPrivacidadRegistro>) {}
}
