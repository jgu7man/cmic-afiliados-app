import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { iMaqEquipItem, iMaquinariaEquipo } from 'src/app/public/afiliados/models/perfiles.model';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';

@Component({
  selector: 'g-perfil-equipo-maquinaria',
  templateUrl: './perfil-equipo-maquinaria.component.html',
  styleUrls: ['./perfil-equipo-maquinaria.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilEquipoMaquinariaComponent implements OnInit {

  private _rfc : BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set rfc(RFC: string) { this._rfc.next(RFC); }
  get rfc() { return this._rfc.getValue()}
  @Output() extract$: EventEmitter<string> = new EventEmitter();
  items$?: Observable<iMaqEquipItem[]>

  constructor(
    private _perfiles: PerfilesService,
  ) {

    this._rfc.pipe(filter(rfc => !!rfc)).subscribe(rfc => {
      this._perfiles.getInfoDoc<iMaquinariaEquipo>(this.rfc, 'maquinaria-equipo')
        .then(data => { if (data) this.extract$.emit(data.extract) })

      this.items$ = this._perfiles.getInfoCollection
        <iMaqEquipItem>(this.rfc, 'maquinaria-equipo')
    })

   }

  ngOnInit(): void {
  }

}
