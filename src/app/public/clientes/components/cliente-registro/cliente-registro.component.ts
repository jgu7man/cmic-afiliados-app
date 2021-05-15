import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { MyErrorStateMatcher } from 'src/app/public/afiliados/components/afiliados-registro/afiliados-registro.component';
import { ClientsService } from '../../services/clients.service';

@Component({
  templateUrl: './cliente-registro.component.html',
  styleUrls: ['./cliente-registro.component.scss']
})
export class ClienteRegistroComponent implements OnInit {


  accountForm: FormGroup

  hide: boolean = true
  matcher = new MyErrorStateMatcher();
  constructor(
    private _clients: ClientsService,
    private _route: ActivatedRoute,
    private _alert: GdevAlert,
    private _router: Router
  ) {
    let {email} = this._route.snapshot.queryParams
    this.accountForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      paterno: new FormControl('', [Validators.required]),
      materno: new FormControl('', [Validators.required]),
      contrasena: new FormControl('', [Validators.required]),
      confcontrasena: new FormControl('', [Validators.required])
    })
    if (email) this.accountForm.patchValue({ email })
    else this._alert.sendMessageAlert(
      `<h1>Email no encontrado</h1>
        <p class="center"> Debes seguir el link que te llegó por email para crear una cuenta. <br> Si no has recibido un correo de invitación, ponete en contacto con la CMIC Colima </p>`
    , 'html').subscribe(() => this._router.navigate(['/']))
   }

  ngOnInit(): void {
  }

  preventSpaces(e:any) {
    if (e.which === 32)
      return false;
    else {
      return
    }
  }

  onSubmit() {
    this._clients.createAccount(this.accountForm.getRawValue())
  }

}
