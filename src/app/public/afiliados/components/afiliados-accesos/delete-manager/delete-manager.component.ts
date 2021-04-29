import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfiliadosService } from '../../../services/afiliados.service';
import { ManagersService } from '../../../services/managers.service';

@Component({
  templateUrl: './delete-manager.component.html',
  styleUrls: ['./delete-manager.component.scss']
})
export class DeleteManagerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: string,
    public dialog: MatDialogRef<DeleteManagerComponent>,
    private _managers: ManagersService,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    await this._managers.delete(this.id)
    this.dialog.close()
  }

}
