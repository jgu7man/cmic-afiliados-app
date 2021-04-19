import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';
import { iExperiencia, iProyecto } from 'src/app/public/afiliados/models/perfiles.model';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'g-perfil-experiencia',
  templateUrl: './perfil-experiencia.component.html',
  styleUrls: ['./perfil-experiencia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilExperienciaComponent implements OnInit {

  private _rfc : BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set rfc(RFC: string) { this._rfc.next(RFC); }
  get rfc() { return this._rfc.getValue()}

  @Output() extract$: EventEmitter<string> = new EventEmitter();
  items$?: Observable<iProyecto[]>

  constructor(
    private _perfiles: PerfilesService,
  ) {

    this._rfc.pipe(filter(rfc => !!rfc)).subscribe(rfc => {
      this._perfiles.getInfoDoc<iExperiencia>(this.rfc, 'experiencia')
        .then(data => { if (data) this.extract$.emit(data.extract) })

      this.items$ = this._perfiles.getInfoCollection
        <iProyecto>(this.rfc, 'experiencia')
    })

   }

  ngOnInit(): void {
  }

}
