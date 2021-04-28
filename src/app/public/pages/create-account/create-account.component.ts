import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GdevAlert } from 'gdev-alert';
import { MyErrorStateMatcher } from '../../afiliados/components/afiliados-registro/afiliados-registro.component';
import { AfiliadosService } from '../../afiliados/services/afiliados.service';

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

  constructor(
    private _route: ActivatedRoute,
    private _afiliados: AfiliadosService,
    private _alert: GdevAlert,
    private _router: Router
  ) {
    let {email, rfc} = this._route.snapshot.queryParams
    if (email && rfc) { this.accountForm.patchValue({ email, RFC: rfc }) }
    else {
      this._alert.sendRequestAlert({message:'URL no válida.'}).subscribe(() => {
        console.log('clicked')
        this._router.navigate(['/'])
      })
    }

   }

  ngOnInit(): void {
  }

  onSubmit() {
    this._afiliados.createManager(this.accountForm.getRawValue())
  }

}
