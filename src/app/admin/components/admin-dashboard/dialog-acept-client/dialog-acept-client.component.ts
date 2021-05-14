import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iPeticion } from 'src/app/admin/models/roles.model';
import { AccesosService } from 'src/app/admin/services/accesos.service';

@Component({
  templateUrl: './dialog-acept-client.component.html',
  styleUrls: ['./dialog-acept-client.component.scss']
})
export class DialogAceptClientComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public peticion: iPeticion,
    private _accesos: AccesosService,
    public dialog: MatDialogRef<DialogAceptClientComponent>
  ) { }

  ngOnInit(): void {
  }

  async onAcept() {
    // await this._accesos.sendAccessInvitation(this.peticion.email)
  }

}
