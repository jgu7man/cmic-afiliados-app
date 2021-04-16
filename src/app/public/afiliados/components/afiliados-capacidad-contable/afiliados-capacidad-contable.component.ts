import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { GdevCache } from 'gdev-cache';
import { GdevLoading } from 'gdev-loading';
import { StorageService } from 'src/app/services/storage-service.service';

@Component({
  templateUrl: './afiliados-capacidad-contable.component.html',
  styleUrls: ['./afiliados-capacidad-contable.component.scss'],
})
export class AfiliadosCapacidadContableComponent implements OnInit {
  // CapacidadForm: FormGroup;
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
