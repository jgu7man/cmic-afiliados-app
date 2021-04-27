import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, interval, of } from 'rxjs';
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
export class AfiliadoPerfilSidebarComponent implements OnInit {

  private _afiliado: BehaviorSubject<AfiliadoModel> = new BehaviorSubject(
    emptyAfiliado
  );
  @Input() set afiliado(variable: AfiliadoModel) { this._afiliado.next(variable); }
  get afiliado() { return this._afiliado.getValue() }

  @Input() personal: iPersonal = {} as iPersonal;


  constructor(
    private dialog: MatDialog,
    public afiliados_: AfiliadosService,
    private _loading: GdevLoading
  ) { }

  ngOnInit(): void {
    this._afiliado.pipe(debounceTime(500)).subscribe(data => {
      // console.log( data )
      this.afiliado = data
    })
  }

  putImage(img: HTMLDivElement) {
    return of({ 'height.px': img.offsetWidth, 'width': '66.66%' } )
      .pipe(delay(1000), tap(data => console.log( data )))

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
