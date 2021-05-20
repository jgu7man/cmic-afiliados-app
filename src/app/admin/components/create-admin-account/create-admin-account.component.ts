import { Component, OnInit, ChangeDetectionStrategy, HostListener } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MxAlert } from '@marxa/devkit';
import { AdminService } from 'src/app/admin/services/admin.service';
import { MyErrorStateMatcher } from '../../../public/afiliados/components/afiliados-registro/afiliados-registro.component';
import { ManagersService } from '../../../public/afiliados/services/managers.service';
import { ClientsService } from '../../../public/clientes/services/clients.service';

@Component({
  templateUrl: './create-admin-account.component.html',
  styleUrls: ['./create-admin-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAdminAccountComponent implements OnInit {

  accountForm: FormGroup = new FormGroup({
    email: new FormControl({ value: '', disabled: true }, [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    paterno: new FormControl('', [Validators.required]),
    materno: new FormControl(''),
    contrasena: new FormControl('', [Validators.required]),
    confcontrasena: new FormControl('', [Validators.required])
  })

  hide: boolean = true
  matcher = new MyErrorStateMatcher();
  topScroll: boolean = false
  bottomScroll: boolean = false

  constructor(
    private _route: ActivatedRoute,
    private _alert: MxAlert,
    private _router: Router,
    private _managers: ManagersService,
    private _clients: ClientsService,
    private _admin: AdminService
  ) {
    let { email } = this._route.snapshot.queryParams

    // if (perfil == 'manager') {
    //   if (email && rfc) { this.accountForm.patchValue({ email, RFC: rfc }) }
    //   else {
    //     this._alert.request({message:'URL no válida.'}).subscribe(() => {
    //       console.log('clicked')
    //       this._router.navigate(['/'])
    //     })
    //   }
    if (email) {
      this.accountForm.patchValue({ email })
    } else {
      this._alert.message(
        `<h1>Email no encontrado</h1>
          <p class="center"> Debes seguir el link que te llegó por email para crear una cuenta. <br> Si no has recibido un correo de invitación, ponete en contacto con la CMIC Colima </p>`
      , 'html').subscribe(() => this._router.navigate(['/']))
    }

  }

  // topBreak: number = 76
  // bottomBreak: number = 0
  // @HostListener('window:scroll', ['$event'])
  // onScroll($event: any) {
  //   let element = $event.target.scrollingElement
  //   let scrollOffset = element.scrollTop;
  //   let clientHeight = element.clientHeight
  //   this.bottomBreak = 1022 - clientHeight
  //   console.log( this.bottomBreak )
  //   this.topScroll = scrollOffset > this.topBreak && scrollOffset < this.bottomBreak  ? true : false
  //   this.bottomScroll = scrollOffset > this.bottomBreak ? true : false
  // }

  ngOnInit(): void {
  }

  onSubmit() {
    this._admin.createAccount(this.accountForm.getRawValue())
    // switch (this.perfil) {
    //   case 'manager':
    //     this._managers.createManager(this.accountForm.getRawValue())
    //     break;
    //   case 'client':
    //     this._clients.createAccount(this.accountForm.getRawValue())
    //     break;
    //   case 'admin':
    //     break;
    // }
  }

}
