import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfiliadosService } from '../../../services/afiliados.service';

@Component({
  templateUrl: './delete-manager.component.html',
  styleUrls: ['./delete-manager.component.scss']
})
export class DeleteManagerComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private id: string,
    public dialog: MatDialogRef<DeleteManagerComponent>,
    private _afiliados: AfiliadosService,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    await this._afiliados.deleteManager(this.id)
    this.dialog.close()
  }

}
