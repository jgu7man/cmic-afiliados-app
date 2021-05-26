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

import { DatosGeneralesModel, iAfiliadoRequest, iManager } from '../../models/afiliados.model';
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
  afiliado: DatosGeneralesModel;
  request: iAfiliadoRequest
  datosForm: FormGroup = new FormGroup({
    RFC: new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(13), this.validateSymbols]),
    email: new FormControl('', [Validators.required, Validators.email])
  })
  fileForm: FormGroup = new FormGroup({
    file: new FormControl('', [Validators.required])
  })
  privacyForm: FormGroup = new FormGroup({
    aviso_privacidad: new FormControl(false, [Validators.required])
  })


  invitado: boolean = false

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _afiliadosService: AfiliadosService,
  ) {
    this.afiliado = new DatosGeneralesModel('','','')
    this.request = {
      empresa: this.afiliado,
      email: '',
      file: {},
      request: new Date()
    }
  }

  onFormChanges(event: any) {
    console.log( event )
    this.afiliado = event
  }

  onFileUploaded(event: any) {
    console.log( event )
    this.fileForm.patchValue({file: event})
  }

  get validRequest() {
    console.log({
      datos: this.datosForm.valid,
      prvacy: this.privacyForm.valid,
      file: this.fileForm.valid
    })
    if (this.afiliado.slug) {
      return this.datosForm.valid && this.privacyForm.valid && this.fileForm.valid
    } else {
      return false
    }
  }

  onSubmit(): void {
    this.request.email = this.datosForm.controls.email.value
    this.request.file = this.fileForm.controls.file.value
    this._afiliadosService.registRequest(this.request);
  }


  OpenPrivacidadRegistro(): void {
    const dialogRef = this.dialog.open(DialogPrivacidadRegistro);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.privacyForm.controls.aviso_privacidad.setValue(true);
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
