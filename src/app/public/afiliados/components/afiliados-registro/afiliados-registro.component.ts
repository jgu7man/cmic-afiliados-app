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
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { iUserAfiliado } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';

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
  public usuario: iUserAfiliado = {
    RFC: '',
    email: '',
    contrasena: '',
  };
  hide = true;
  matcher = new MyErrorStateMatcher();
  rfcCtrl: FormControl

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _afiliadosService: AfiliadosService,
    private _router: Router
  ) {
    this._afiliadosService.afiliado$.subscribe(user => {
      if (user) { this._router.navigate(['/afiliados']) }
    })
    this.afiliado = this.formBuilder.group(
      {
        RFC: this.rfcCtrl = new FormControl( '', [Validators.required, Validators.minLength(12), Validators.maxLength(13), this.validateSymbols]),
        email: ['', [Validators.required, Validators.email]],
        contrasena: ['', [Validators.required]],
        confcontrasena: ['', [Validators.required]],
        aviso_privacidad: [false, Validators.requiredTrue],
      },
      { validator: this.checkPasswords }
    );
  }
  onSubmit(): void {

    /*  console.log(this.afiliado.getRawValue());
    this.usuario = this.afiliado.getRawValue() as iUserAfiliado;
    console.log(this.usuario) */

    this._afiliadosService.registAfiliado(
      this.afiliado.value as iUserAfiliado
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
