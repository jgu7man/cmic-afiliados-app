import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/admin/services/admin.service';
import { iManager } from 'src/app/public/afiliados/models/afiliados.model';
import { DialogAccesoComponent } from './dialog-acceso/dialog-acceso.component';

@Component({
  templateUrl: './admin-accesos.component.html',
  styleUrls: ['./admin-accesos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAccesosComponent implements OnInit {


  managers: iManager[] = []

  constructor(
    private _admin: AdminService,
    private _dialog: MatDialog
  ) {
   }

  ngOnInit(): void {
  }

  openAddDialog() {
    this._dialog.open(DialogAccesoComponent, {
      minWidth: 414
    })
  }


}
