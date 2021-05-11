import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionListChange } from '@angular/material/list';
import { GdevCache } from 'gdev-cache';
import { Observable } from 'rxjs';
import { iManager } from '../../models/afiliados.model';
import { AfiliadosService } from '../../services/afiliados.service';
import { AddManagerComponent } from './add-manager/add-manager.component';
import firebase from 'firebase/app'
import { DeleteManagerComponent } from './delete-manager/delete-manager.component';
import { tap } from 'rxjs/operators';
import { ManagersService } from '../../services/managers.service';

@Component({
  templateUrl: './afiliados-accesos.component.html',
  styleUrls: ['./afiliados-accesos.component.scss']
})
export class AfiliadosAccesosComponent implements OnInit {

  managers$: Observable<iManager[]>
  currentUser: iManager
  constructor(
    public location_: Location,
    private _cache: GdevCache,
    private _dialog: MatDialog,
    private _managers: ManagersService
  ) {
    this.managers$ = this._managers.getForAfiliado()
    this.currentUser = this._cache.getDataKey<iManager>('user') as iManager
   }

  ngOnInit(): void {
  }

  onSelected(event: MatSelectionListChange) {

  }

  time(date: firebase.firestore.Timestamp): Date {
    return new Date(date.toMillis())
  }

  openAddDialog() {
    this._dialog.open(AddManagerComponent, {
      minWidth: 414,
      maxWidth: '50%'
    })
  }

  openDeleteDialog(id?: string) {
    if (id) {
      this._dialog.open(DeleteManagerComponent, {
        minWidth: 414,
        data: id
      })
    }
  }

}
