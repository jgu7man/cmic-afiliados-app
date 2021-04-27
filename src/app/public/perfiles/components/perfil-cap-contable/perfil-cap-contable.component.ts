import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { orderBy } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { iDeclaracion } from 'src/app/public/afiliados/models/perfiles.model';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';

@Component({
  selector: 'g-perfil-cap-contable',
  templateUrl: './perfil-cap-contable.component.html',
  styleUrls: ['./perfil-cap-contable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilCapContableComponent implements OnInit {

  private _rfc : BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set rfc(RFC: string) { this._rfc.next(RFC); }
  get rfc() { return this._rfc.getValue()}
  public declaraciones: iDeclaracion[] = []
  @Output() extract$: EventEmitter<string> = new EventEmitter();
  // public capacidad: iCapContable = {
  //   extract: '', capacidad: ''
  // }

  constructor(
    private _perfil: PerfilService,
    private _route: ActivatedRoute
  ) {
    this._rfc.pipe(filter(rfc => !!rfc)).subscribe(rfc => {

      // this._perfil.getInfoDoc<iCapContable>(this.rfc, 'capacidad_financiera')
      //   .then(data => {if (data){
      //     this.capacidad = data
      //     this.extract$.emit(data.extract)
      //   }})
      this._perfil.getInfoCollection<iDeclaracion>( 'capacidad_financiera')
        .pipe(map(items => orderBy(items, ['year'], ['desc'])) )
        .subscribe(items => { this.declaraciones = items.splice(0,3) })
    })
   }

  ngOnInit(): void {
  }

}
