import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { GdevUploadModalComponent } from 'src/app/gdev/gdev-storage/components/upload-modal/upload-modal.component';
import { AfiliadoModel,  emptyAfiliado } from 'src/app/public/afiliados/models/afiliados.model';
import { iRecHumanos } from 'src/app/public/afiliados/models/perfiles.model';
import { iUploadedFile, iUploadOptions } from 'src/app/gdev/gdev-storage/storage.model';
import { AfiliadosService } from '../../services/afiliados.service';
import { MatChipInputEvent } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

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

  @Input() personal: iRecHumanos = {} as iRecHumanos;
  servicios: string[] = []
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor(
    private dialog: MatDialog,
    public afiliados_: AfiliadosService
  ) { }

  ngOnInit(): void {
    if (this.afiliado.servicios) this.servicios = this.afiliado.servicios
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
      this.afiliados_.savePartialAfiliado('imgPerfil', file[0])
    })

  }


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.servicios.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(servicio:string): void {
    const index = this.servicios.indexOf(servicio);

    if (index >= 0) {
      this.servicios.splice(index, 1);
    }
  }

  get year(): number {
    return new Date().getFullYear()
  }

  get Hombres() {
    if (this.personal) {
      return (this.personal.hombres * 100) / this.personal.planta_fija
    } else {
      return 0
    }
  }
  get Mujeres() {
    if (this.personal) {
      return ( this.personal.mujeres * 100 ) / this.personal.planta_fija
    } else {
      return 0
    }
  }

}
