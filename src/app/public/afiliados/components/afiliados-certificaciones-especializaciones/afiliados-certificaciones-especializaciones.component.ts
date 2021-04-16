import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  templateUrl: './afiliados-certificaciones-especializaciones.component.html',
  styleUrls: ['./afiliados-certificaciones-especializaciones.component.scss'],
})
export class AfiliadosCertificacionesEspecializacionesComponent
  implements OnInit {
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
