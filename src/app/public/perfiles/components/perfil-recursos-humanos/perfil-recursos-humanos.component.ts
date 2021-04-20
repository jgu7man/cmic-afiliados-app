import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { iMemberModel, iRecHumanos } from 'src/app/public/afiliados/models/perfiles.model';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';

@Component({
  selector: 'g-perfil-recursos-humanos',
  templateUrl: './perfil-recursos-humanos.component.html',
  styleUrls: ['./perfil-recursos-humanos.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilRecursosHumanosComponent implements OnInit {

  private _rfc : BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set rfc(RFC: string) { this._rfc.next(RFC); }
  get rfc() { return this._rfc.getValue()}
  @Output() extract$: EventEmitter<string> = new EventEmitter();
  items$?: Observable<iMemberModel[]>
  @Output() recursos$: EventEmitter<iRecHumanos> = new EventEmitter();

  constructor(
    private _perfiles: PerfilesService,
  ) {

    this._rfc.pipe(filter(rfc => !!rfc)).subscribe(rfc => {
      this._perfiles.getInfoDoc<iRecHumanos>(this.rfc, 'recursos-humanos')
        .then(data => {
          if (data) {
            this.recursos$.emit(data)
            this.extract$.emit(data.extract)
          }
        })

      this.items$ = this._perfiles.getInfoCollection
        <iMemberModel>(this.rfc, 'recursos-humanos')
    })

   }

  ngOnInit(): void {
  }

}
