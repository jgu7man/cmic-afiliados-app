import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatStepperIntl, MatVerticalStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { MxStorage } from '@marxa/storage';
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
  privacy: boolean = false
  @ViewChild('stepper') stepper!: MatVerticalStepper

  invitado: boolean = false

  constructor(
    public formBuilder: FormBuilder,
    public dialog: MatDialog,
    private _afiliadosService: AfiliadosService,
    public storage: MxStorage,
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
    this.afiliado = event
  }

  onFileUploaded(event: any) {
    this.storage.showDropzone$.next(false)
    this.fileForm.patchValue( { file: event[0] } )
    this.dialog.closeAll()
  }

  validateRegistered(btn: MatButton) {
    let RFC = this.datosForm.value['RFC']
    this._afiliadosService.getPerfil( RFC ).subscribe( ( data ) => {
      if ( data ) {
        this.dialog.open(DialogRegistered)
        btn.disabled = true
      } else {
        this.stepper.next()
      }
    })
  }

  get validRequest() {
    if (this.afiliado.slug != '') {
      return this.datosForm.valid && this.privacy && this.fileForm.valid
    } else {
      return false
    }
  }


  onSubmit(): void {
    this.request.email = this.datosForm.controls.email.value
    this.request.file = this.fileForm.controls.file.value
    this.request.empresa = this.afiliado
    this._afiliadosService.registRequest(this.request);
  }


  OpenPrivacidadRegistro(): void {
    const dialogRef = this.dialog.open(DialogPrivacidadRegistro);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) { this.privacy = true }
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
  constructor(public dialog_: MatDialogRef<DialogPrivacidadRegistro>) {}
}

@Component({
  selector: 'dialog-privacidad',
  templateUrl: 'dialog-registered.html',
})
export class DialogRegistered {
  constructor(public dialog_: MatDialogRef<DialogRegistered>) {}
}
