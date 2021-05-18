import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilService } from '../../../services/perfil.service';
import { emptyMember } from '../../../models/perfiles.model';

@Component({
  templateUrl: './afiliados-recursos-humanos.component.html',
  styleUrls: ['./afiliados-recursos-humanos.component.scss'],
})
export class AfiliadosRecursosHumanosComponent implements OnInit {

  memberForm: FormGroup;

  constructor(
    public location_: Location,
    public perfil_: PerfilService,
  ) {


    this.memberForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
    })

    this.perfil_.initialize('recursos_humanos')
  }

  ngOnInit(): void {
    this.perfil_.editSubscription = this.perfil_
      .listenEditingItem.subscribe(item => {
      this.memberForm.patchValue(item)
    })

  }

  async onSaveItem() {
    await this.perfil_.saveItems(this.memberForm, 'recursos_humanos')
    let {updated, id, ...item} = emptyMember
    this.memberForm.setValue(item)
    this.memberForm.markAsPristine()
  }

  ngOnDestroy() {
    this.perfil_.getOutSection()
  }


}
