import { Component, OnInit, ChangeDetectionStrategy, Input, ElementRef, AfterViewChecked, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, interval, Observable, of, Subscription } from 'rxjs';
import { MxUploadModalComponent } from '@marxa/storage';
import { AfiliadoModel,  emptyAfiliado } from 'src/app/public/afiliados/models/afiliados.model';
import { iPersonal } from 'src/app/public/afiliados/models/perfiles.model';
import { iUploadedFile, iUploadOptions } from '@marxa/storage';
import { AfiliadosService } from '../../services/afiliados.service';

import { FormControl, Validators } from '@angular/forms';
import { debounceTime, delay, map, mapTo, take, tap } from 'rxjs/operators';
import { MxLoading } from '@marxa/devkit';
import { PerfilService } from '../../services/perfil.service';
import { MxDate } from '@marxa/devkit';

@Component({
  selector: 'g-afiliado-perfil-sidebar',
  templateUrl: './afiliado-perfil-sidebar.component.html',
  styleUrls: ['./afiliado-perfil-sidebar.component.scss']
})
export class AfiliadoPerfilSidebarComponent implements OnInit, AfterViewInit, OnDestroy {

  public _afiliado: BehaviorSubject<AfiliadoModel> = new BehaviorSubject(
    emptyAfiliado
  );
  @Input() set afiliado(variable: AfiliadoModel) { this._afiliado.next(variable); }
  get afiliado() { return this._afiliado.getValue() }

  @Input() personal: iPersonal = {} as iPersonal;
  @ViewChild('img') imgContainer?: ElementRef;
  imgWidth?: number
  imgStyle: any
  afiliadoSubs!: Subscription

  constructor(
    private dialog: MatDialog,
    private _loading: MxLoading,
    public perfil_: PerfilService,
    public date_: MxDate
  ) { }

  async ngOnInit() {
    this.afiliadoSubs =
    this._afiliado.pipe( debounceTime( 500 ) ).subscribe( data => {
      // console.log( data )
      this.afiliado = data
    })

  }

  async ngAfterViewInit() {
    if (this.imgContainer) {
      // console.log( this.imgWidth )
      await this._loading.waitFor(1000)
      this.imgWidth = this.imgContainer.nativeElement.offsetWidth
      // this.imgStyle = { 'height.px':this.imgWidth, 'width': '66.66%' }
    }

  }

  get containerWidth(): Observable<number> {
    // console.log( this.imgContainer?.nativeElement.offsetWidth )
    return of(this.imgContainer?.nativeElement.offsetWidth).pipe(delay(1000), tap(console.log))
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

    this.dialog.open(MxUploadModalComponent, {
      width: '40%',
      minHeight: '40%',
      data: options
    }).afterClosed().subscribe((file: iUploadedFile[]) => {
      this.perfil_.updateInfoDoc('perfil.imgPerfil', file[0])
    })

  }




  get year(): number {
    return new Date().getFullYear()
  }


  ngOnDestroy() {
    this.afiliadoSubs.unsubscribe()
  }

}
