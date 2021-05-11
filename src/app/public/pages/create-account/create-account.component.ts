import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { Rol } from 'src/app/admin/models/roles.model';
import { AdminService } from 'src/app/admin/services/admin.service';
import { MyErrorStateMatcher } from '../../afiliados/components/afiliados-registro/afiliados-registro.component';
import { AfiliadosService } from '../../afiliados/services/afiliados.service';
import { ManagersService } from '../../afiliados/services/managers.service';
import { ClientsService } from '../../clientes/services/clients.service';

@Component({
  selector: 'g-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateAccountComponent implements OnInit {

  accountForm: FormGroup = new FormGroup({
    RFC: new FormControl(''),
    email: new FormControl({ value: '', disabled: true }, [Validators.required]),
    contrasena: new FormControl('', [Validators.required]),
    confcontrasena: new FormControl('', [Validators.required])
  })

  hide: boolean = true
  matcher = new MyErrorStateMatcher();
  perfil:Rol

  constructor(
    private _route: ActivatedRoute,
    private _alert: GdevAlert,
    private _router: Router,
    private _managers: ManagersService,
    private _clients: ClientsService,
    private _admin: AdminService
  ) {
    let { email, rfc, perfil } = this._route.snapshot.queryParams
    this.perfil = perfil
    if (perfil == 'manager') {
      if (email && rfc) { this.accountForm.patchValue({ email, RFC: rfc }) }
      else {
        this._alert.sendRequestAlert({message:'URL no válida.'}).subscribe(() => {
          console.log('clicked')
          this._router.navigate(['/'])
        })
      }
    } else if ((perfil == 'client' || perfil == 'admin') && email) {
      this.accountForm.patchValue({ email, })
    } else {
      this._alert.sendRequestAlert({message: 'Perfil no encontrado'}).subscribe(() => this._router.navigate(['/']))
    }

   }

  ngOnInit(): void {
  }

  onSubmit() {
    switch (this.perfil) {
      case 'manager':
        this._managers.createManager(this.accountForm.getRawValue())
        break;
      case 'client':
        this._clients.createAccount(this.accountForm.getRawValue())
        break;
      case 'admin':
        this._admin.createAccount(this.accountForm.getRawValue())
        break;
    }
  }

}
