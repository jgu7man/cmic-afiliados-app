import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  templateUrl: './afiliados-equipo-maquinaria.component.html',
  styleUrls: ['./afiliados-equipo-maquinaria.component.scss'],
})
export class AfiliadosEquipoMaquinariaComponent implements OnInit {
  extractCtrl: FormControl;
  constructor(
    private _loading: GdevLoading,
    private _storage: StorageService,
    private _cache: GdevCache
  ) {
    this.extractCtrl = new FormControl('', [Validators.required]);
  }
  ngOnInit(): void {}
}
