import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FloatMenuComponent } from '../../float-menu/float-menu.component';

@Component({
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  hover: boolean = false
  @ViewChild('floatMenu') private floatMenu?: FloatMenuComponent

  constructor(
    private _route: ActivatedRoute
  ) {
    console.log( this._route.snapshot.data )
  }

  ngOnInit(): void {
  }

  onVerCatalogos() {
    this.floatMenu?.select(0)
  }

}
