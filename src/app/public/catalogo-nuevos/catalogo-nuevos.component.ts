import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { iUploadedFile } from '@marxa/storage';
import { takeWhile } from 'rxjs/operators';
import { AfiliadoModel } from '../afiliados/models/afiliados.model';
import { iPerfil } from '../afiliados/models/perfiles.model';
import { AfiliadosService } from '../afiliados/services/afiliados.service';
import { DialogClienteLoginComponent } from '../clientes/components/dialog-cliente-login/dialog-cliente-login.component';

@Component({
  selector: 'g-catalogo-nuevos',
  templateUrl: './catalogo-nuevos.component.html',
  styleUrls: ['./catalogo-nuevos.component.scss']
})
export class CatalogoNuevosComponent implements OnInit {

  afiliados: AfiliadoModel[] = []
  @Input() cantidad: number = 4
  constructor(
    private _afiliados: AfiliadosService,
    private _afAuth: AngularFireAuth,
    private _router: Router,
    private _dialog: MatDialog
  ) {
    this._afiliados.getRecentAfiliados(this.cantidad).subscribe(list => {
      this.afiliados = list
    })
   }

  ngOnInit(): void {
  }

  logoImage(img: iUploadedFile) {
    return `url('${img.url}')`
  }

  avatar(perfil?: iPerfil) {
    return perfil?.imgPerfil ? perfil.imgPerfil.url : ''
  }

  goPerfil(slug: string) {
    this._afAuth.authState
      .pipe(takeWhile(user => !user, true))
      .subscribe(user => {
      if (user) this._router.navigate(['/afiliado', slug])
      else this._dialog.open(DialogClienteLoginComponent, {
        width: '370px',
        data: slug
      }).afterClosed().subscribe(slug => {
        if(slug) this._router.navigate(['/afiliado', slug])
      })
    })
  }

}
