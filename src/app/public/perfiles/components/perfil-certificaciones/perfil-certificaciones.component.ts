import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';
import { iCertificacion } from '../../../afiliados/models/perfiles.model';

@Component({
  selector: 'g-perfil-certificaciones',
  templateUrl: './perfil-certificaciones.component.html',
  styleUrls: ['./perfil-certificaciones.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilCertificacionesComponent implements OnInit {

  private _rfc : BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set rfc(RFC: string) { this._rfc.next(RFC); }
  get rfc() { return this._rfc.getValue()}
  @Output() extract$: EventEmitter<string> = new EventEmitter();
  items$?: Observable<iCertificacion[]>

  constructor(
    private _perfiles: PerfilesService,
  ) {

    this._rfc.pipe(filter(rfc => !!rfc)).subscribe(rfc => {
      // this._perfiles.getInfoDoc<iCertificaciones>(this.rfc, 'certificaciones')
      //   .then(data => { if (data) this.extract$.emit(data.extract) })

      this.items$ = this._perfiles.getInfoCollection
        <iCertificacion>(this.rfc, 'certificaciones')
    })

   }

  ngOnInit(): void {
  }

}
