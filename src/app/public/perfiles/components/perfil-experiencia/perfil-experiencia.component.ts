import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PerfilesService } from 'src/app/public/afiliados/services/perfiles.service';
import { iProyecto } from 'src/app/public/afiliados/models/perfiles.model';
import { filter, tap } from 'rxjs/operators';

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

  @Input() edit: boolean = false;

  @Output() toEdit: EventEmitter<iProyecto> = new EventEmitter()
  @Output() extract$: EventEmitter<string> = new EventEmitter();
  items$?: Observable<iProyecto[]>
  items: iProyecto[] = []
  editingItem?: number

  constructor(
    public  perfiles_: PerfilesService,
  ) {

    this._rfc.pipe(filter(rfc => !!rfc)).subscribe(rfc => {
      this.items$ = this.perfiles_.getInfoCollection
        <iProyecto>(rfc, 'experiencia')
        .pipe(tap(() =>this.editingItem = undefined))
    })

  }

  ngOnInit(): void {
  }

  sendToEdit(item: iProyecto, index: number) {
    this.toEdit.emit(item)
    this.editingItem = index
  }

}
