import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, AfterViewChecked, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, interval, Observable, of } from 'rxjs';
import { GdevUploadModalComponent } from 'src/app/gdev/gdev-storage/components/upload-modal/upload-modal.component';
import { AfiliadoModel,  emptyAfiliado } from 'src/app/public/afiliados/models/afiliados.model';
import { iPersonal } from 'src/app/public/afiliados/models/perfiles.model';
import { iUploadedFile, iUploadOptions } from 'src/app/gdev/gdev-storage/storage.model';
import { AfiliadosService } from '../../services/afiliados.service';

import { FormControl, Validators } from '@angular/forms';
import { debounceTime, delay, map, mapTo, take, tap } from 'rxjs/operators';
import { GdevLoading } from 'gdev-loading';

@Component({
  selector: 'g-afiliado-perfil-sidebar',
  templateUrl: './afiliado-perfil-sidebar.component.html',
  styleUrls: ['./afiliado-perfil-sidebar.component.scss']
})
export class AfiliadoPerfilSidebarComponent implements OnInit, AfterViewInit {

  public _afiliado: BehaviorSubject<AfiliadoModel> = new BehaviorSubject(
    emptyAfiliado
  );
  @Input() set afiliado(variable: AfiliadoModel) { this._afiliado.next(variable); }
  get afiliado() { return this._afiliado.getValue() }

  @Input() personal: iPersonal = {} as iPersonal;
  @ViewChild('img') imgContainer?: HTMLDivElement;
  imgWidth?: number
  imgStyle: any

  constructor(
    private dialog: MatDialog,
    public afiliados_: AfiliadosService,
    private _loading: GdevLoading
  ) { }

  async ngOnInit() {
    this._afiliado.pipe(debounceTime(500)).subscribe(data => {
      this.afiliado = data
    })

  }

  ngAfterViewInit() {
    if (this.imgContainer) {
      this.imgWidth = this.imgContainer.offsetWidth
      this.imgStyle = { 'height.px':this.imgWidth, 'width': '66.66%' }
    }

  }


  get ImageSrc() {
    return this.afiliado.perfil
      ? this.afiliado.perfil.imgPerfil
        ? this.afiliado.perfil.imgPerfil.url
        : ''
      : ''
  }

  uploadProfileImage(): void {

    let options: iUploadOptions = {
      path: `afiliados/${this.afiliado.datos_generales.RFC}`,
      multiple: false,
      'uploadButton': true
    }

    this.dialog.open(GdevUploadModalComponent, {
      width: '40%',
      minHeight: '40%',
      data: options
    }).afterClosed().subscribe((file: iUploadedFile[]) => {
      this.afiliados_.savePartialAfiliado('perfil.imgPerfil', file[0], this.afiliado.datos_generales.RFC)
    })

  }




  get year(): number {
    return new Date().getFullYear()
  }

  get Hombres() {
    if (this.personal && this.personal.hombres) {
      return (this.personal.hombres * 100) / this.personal.planta_fija
    } else {
      return 0
    }
  }
  get Mujeres() {
    if (this.personal && this.personal.mujeres) {
      return ( this.personal.mujeres * 100 ) / this.personal.planta_fija
    } else {
      return 0
    }
  }

}
