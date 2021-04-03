import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatosGenerales } from '../../afiliados.model';

@Component({
  selector: 'g-afiliados-form',
  templateUrl: './afiliacion-form.component.html',
  styleUrls: ['./afiliacion-form.component.scss'],
})
export class AfiliacionFormComponent implements OnInit {
  // REVIEW La forma de cargarlos los datos con clase hace más simple su iniciación
  public datosGenerales: DatosGenerales;

  constructor(public dialog: MatDialog) {
    this.datosGenerales = new DatosGenerales(
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      false,
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      false,
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      '',  
      
      false,
      false,
      false
    );
  }

  ngOnInit(): void {}

  OpenPrivacidad(): void {
    const dialogRef = this.dialog.open(DialogPrivacidad);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  OpenRetencion(): void {
    const dialogRef = this.dialog.open(DialogRetencion);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}

@Component({
  selector: 'dialog-privacidad',
  templateUrl: 'dialog-privacidad.html',
})
export class DialogPrivacidad {}

@Component({
  selector: 'dialog-retencion',
  templateUrl: 'dialog-retencion.html',
})
export class DialogRetencion {}
