import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';
import { Proyecto } from 'src/app/public/afiliados/models/perfiles.model';
import { MxResponsive } from '@marxa/devkit';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'g-perfil-experiencia',
  templateUrl: './perfil-experiencia.component.html',
  styleUrls: ['./perfil-experiencia.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerfilExperienciaComponent implements OnInit, AfterViewInit {



  @Input() edit: boolean = false;
  editingItem?: number

  items$?: Observable<Proyecto[]>

  @ViewChild('expPanel') private expPanel?: MatAccordion

  constructor(
    public perfil_: PerfilService,
    public responsive: MxResponsive
  ) {

    this.items$ = this.perfil_.getInfoCollection<Proyecto>('experiencia')
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.responsive.large || this.responsive.xLarge) {
      this.expPanel?.openAll()
    }
  }

  sendToEdit(item: Proyecto, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

}
