import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AccesosService } from 'src/app/admin/services/accesos.service';

@Component({
  templateUrl: './dialog-acceso.component.html',
  styleUrls: ['./dialog-acceso.component.scss']
})
export class DialogAccesoComponent implements OnInit {

  accesoForm: FormGroup = new FormGroup({
    'email': new FormControl('', [Validators.required, Validators.email]),
    'perfil': new FormControl('', [Validators.required])
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public accesos: AccesosService,
    public dialog: MatDialogRef<DialogAccesoComponent>,
  ) { }

  ngOnInit(): void {
    console.log( this.data )
  }

  onSubmit(): void {
    this.accesos.sendAccessInvitation(this.accesoForm.value)
    this.dialog.close()
  }

}
