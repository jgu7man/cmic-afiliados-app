import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { AdminService } from 'src/app/admin/services/admin.service';

@Component({
  templateUrl: './dialog-revoke-acceso.component.html',
  styleUrls: ['./dialog-revoke-acceso.component.scss']
})
export class DialogRevokeAccesoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public path: string,
    private _admin: AdminService,
    public dialog: MatDialogRef<DialogRevokeAccesoComponent>
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this._admin.revokeAccess(this.path)
      .then(() => {this.dialog.close()})
  }

}
