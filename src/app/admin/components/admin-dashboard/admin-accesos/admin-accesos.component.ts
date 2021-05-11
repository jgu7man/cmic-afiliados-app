import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/admin/services/admin.service';
import { iManager } from 'src/app/public/afiliados/models/afiliados.model';

@Component({
  templateUrl: './admin-accesos.component.html',
  styleUrls: ['./admin-accesos.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminAccesosComponent implements OnInit {


  managers: iManager[] = []

  constructor(
    private _admin: AdminService
  ) {
    this._admin.getManagers().subscribe(list => this.managers = list)
   }

  ngOnInit(): void {
  }




}
