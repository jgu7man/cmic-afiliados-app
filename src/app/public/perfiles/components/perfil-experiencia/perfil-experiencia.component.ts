import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { PerfilService } from 'src/app/public/afiliados/services/perfil.service';
import { Proyecto } from 'src/app/public/afiliados/models/perfiles.model';
import { MxResponsive } from '@marxa/devkit';
import { MatAccordion } from '@angular/material/expansion';
import { iUploadedFile } from '@marxa/storage';

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
  listDoc?: iUploadedFile
  @Output() items: EventEmitter<Proyecto[]> = new EventEmitter()

  constructor(
    public perfil_: PerfilService,
    public responsive: MxResponsive
  ) {
    this.items$ = this.perfil_.getInfoCollection<Proyecto>('experiencia')
    this.items$.subscribe(items => this.items.emit(items))
    this.perfil_.getList('experiencia').then(file => {
      this.listDoc = file
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    if (this.responsive.large || this.responsive.extraLarge) {
      this.expPanel?.openAll()
    }
  }

  sendToEdit(item: Proyecto, index: number) {
    this.perfil_.onEditItem(item)
    this.editingItem = index
  }

}
