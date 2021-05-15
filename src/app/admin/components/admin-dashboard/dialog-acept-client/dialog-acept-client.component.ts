import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { iPeticion } from 'src/app/admin/models/roles.model';
import { AccesosService } from 'src/app/admin/services/accesos.service';
import { iCliente } from 'src/app/public/clientes/models/cliente.model';
import { ClientsService } from 'src/app/public/clientes/services/clients.service';

@Component({
  templateUrl: './dialog-acept-client.component.html',
  styleUrls: ['./dialog-acept-client.component.scss']
})
export class DialogAceptClientComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public peticion: iCliente,
    public dialog: MatDialogRef<DialogAceptClientComponent>,
    public clientes: ClientsService
  ) { }

  ngOnInit(): void {
  }

  async onAcept() {
    // await this._accesos.sendAccessInvitation(this.peticion.email)
  }

}
