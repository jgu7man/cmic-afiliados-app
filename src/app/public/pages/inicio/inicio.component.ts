import { Component, OnInit, ViewChild } from '@angular/core';
import { FloatMenuComponent } from '../../float-menu/float-menu.component';

@Component({
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  hover: boolean = false
  @ViewChild('floatMenu') private floatMenu?: FloatMenuComponent

  constructor() { }

  ngOnInit(): void {
  }

  onVerCatalogos() {
    this.floatMenu?.select(0)
  }

}
