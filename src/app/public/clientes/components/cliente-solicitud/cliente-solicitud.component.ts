import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from 'src/app/public/afiliados/components/afiliados-registro/afiliados-registro.component';
import { ClientsService } from '../../services/clients.service';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iCliente } from '../../models/cliente.model';
import { MxAlert } from '@marxa/devkit';
import { Router } from '@angular/router';
import { MxLoading } from '@marxa/devkit';
import { iUploadedFile } from 'src/app/gdev/gdev-storage/storage.model';

@Component({
  templateUrl: './cliente-solicitud.component.html',
  styleUrls: ['./cliente-solicitud.component.scss']
})
export class ClienteSolicitudComponent implements OnInit {

  rfcCtrl: FormControl
  // accountForm: FormGroup

  hide: boolean = true
  matcher = new MyErrorStateMatcher();

  datosForm: FormGroup
  INEfileForm: FormGroup
  CIFfileForm: FormGroup

  invisible: boolean = true
  constructor(
    private _clients: ClientsService,
    public storage_: GdevStorage,
    private _alert: MxAlert,
    private _router: Router,
    private _loading: MxLoading,
  ) {

    this.datosForm = new FormGroup({
      RFC: this.rfcCtrl = new FormControl( '', [Validators.required, Validators.minLength(12), Validators.maxLength(13), this.validateSymbols]),
      email: new FormControl('', [Validators.required]),
      nombre_comercial: new FormControl('', [Validators.required]),
    });
    this.INEfileForm = new FormGroup({
      INEfile: new FormControl('', [Validators.required]),
    })
    this.CIFfileForm = new FormGroup({
      CIFfile: new FormControl('',[Validators.required])
    })
    // this.accountForm = new FormGroup({
    //   RFC: new FormControl( '', [Validators.required, ]),
    //   email: new FormControl('', [Validators.required]),
    //   nombre_comercial: new FormControl('', [Validators.required]),
    //   INEfile: new FormControl('', [Validators.required]),
    //   CIFfile: new FormControl('', [Validators.required])
    // })
   }

  async ngOnInit() {
    await this._loading.waitFor(1000)
    this.invisible = false
  }

  get validForms() {
    return this.datosForm.valid && this.INEfileForm.valid && this.CIFfileForm.valid
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

  onFileUploaded(files: iUploadedFile[]) {
    let file = files[0]
    if (file.fileName?.includes('INEfile')) {
      this.INEfileForm.patchValue({ INEfile: file })
      this._alert.notify('INE Cargada')
      this.INEfileForm.disable()
    } else {
      this.CIFfileForm.patchValue({ CIFfile: file })
      this._alert.notify('CIF Cargada')
      this.CIFfileForm.disable()
    }
  }

  async onSubmit() {
    this._loading.toggleWaiting('open')
    let solicitud: iCliente = {
      ...this.datosForm.getRawValue(),
      ...this.CIFfileForm.getRawValue(),
      ...this.INEfileForm.getRawValue(),
      status: 'solicitud',
      request: new Date()
    }
    let { email} = this.datosForm.getRawValue()
    let stored = await this._clients.retriveClient(email);
    if (!stored) {
      await this._clients.createSolicitud(solicitud)
      this._router.navigate(['/'])
      this._loading.toggleWaiting('close')
    } else {
      this._alert.message('Este correo ya está registrado en la plataforma.Te invitamos a iniciar sesión'
      ).subscribe(confirmation => {
        if (confirmation) this._router.navigate(['/clientes/login'])
      })
    }

    // this._clients.createAccount(this.accountForm.getRawValue())
  }



}
