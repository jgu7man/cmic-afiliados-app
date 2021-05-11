import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './dialog-acceso.component.html',
  styleUrls: ['./dialog-acceso.component.scss']
})
export class DialogAccesoComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    console.log( this.data )
  }

}
