import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfiliadosService } from '../../../services/afiliados.service';
import { ManagersService } from '../../../services/managers.service';

@Component({
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.scss']
})
export class AddManagerComponent implements OnInit {

  nuevoManager: FormControl = new FormControl('', [Validators.required, Validators.email])
  constructor(
    public dialog: MatDialogRef<AddManagerComponent>,
    private _managers: ManagersService,
  ) { }

  ngOnInit(): void {
  }

  async onSubmit() {
    await this._managers.add(this.nuevoManager.value)
    this.dialog.close()
  }

}
