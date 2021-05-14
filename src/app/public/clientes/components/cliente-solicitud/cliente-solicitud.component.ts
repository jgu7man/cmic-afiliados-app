import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from 'src/app/public/afiliados/components/afiliados-registro/afiliados-registro.component';
import { ClientsService } from '../../services/clients.service';
import { GdevStorage } from 'src/app/gdev/gdev-storage/storage-service.service';
import { iCliente } from '../../models/cliente.model';
import { GdevAlert } from 'gdev-alert';
import { Router } from '@angular/router';
import { GdevLoading } from 'gdev-loading';

@Component({
  templateUrl: './cliente-solicitud.component.html',
  styleUrls: ['./cliente-solicitud.component.scss']
})
export class ClienteSolicitudComponent implements OnInit {

  rfcCtrl: FormControl
  accountForm: FormGroup

  hide: boolean = true
  matcher = new MyErrorStateMatcher();
  constructor(
    private _clients: ClientsService,
    public storage_: GdevStorage,
    private _alert: GdevAlert,
    private _router: Router,
    private _loading: GdevLoading,
  ) {
    this.accountForm = new FormGroup({
      RFC: this.rfcCtrl = new FormControl( '', [Validators.required, Validators.minLength(12), Validators.maxLength(13), this.validateSymbols]),
      email: new FormControl('', [Validators.required]),
      nombre_comercial: new FormControl('', [Validators.required]),
    })
   }

  ngOnInit(): void {
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

  async onSubmit() {
    this._loading.toggleWaitingSpinner('open')
    let solicitud: iCliente = {
      ...this.accountForm.getRawValue(),
      status: 'solicitud',
      request: new Date()
    }
    let { email} = this.accountForm.getRawValue()
    let stored = await this._clients.retriveClient(email);
    if (!stored) {
      this.storage_.upload().subscribe( async files => {
        console.log( files )
        if (files.length > 0) {
          let INEfile = files.find(file => file.fileName?.includes('INEfile'))
          let CIFfile = files.find(file => file.fileName?.includes('CIFfile'))
          if (INEfile && CIFfile) {
            solicitud = { ...solicitud, INEfile, CIFfile }
            await this._clients.createSolicitud(solicitud)
            this._loading.toggleWaitingSpinner('close')
          } else {
            this._alert.sendMessageAlert('Alguno de los archivos no pudo subirse correctamente, por favor vuelve a intentarlo')
          }
        } else {
          this._alert.sendMessageAlert('Alguno de los archivos no pudo subirse correctamente, por favor vuelve a intentarlo')
        }
      })
    } else {
      this._alert.sendRequestAlert({
        message: 'Este correo ya está registrado en la plataforma.Te invitamos a iniciar sesión',
        trueMsg: 'Iniciar sesión',
        falseMsg: 'Cancelar'
      }).subscribe(confirmation => {
        if (confirmation) this._router.navigate(['/clientes/login'])
      })
    }

    // this._clients.createAccount(this.accountForm.getRawValue())
  }

}
