import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilesService } from '../../../services/perfiles.service';
import { emptyMember } from '../../../models/perfiles.model';

@Component({
  templateUrl: './afiliados-recursos-humanos.component.html',
  styleUrls: ['./afiliados-recursos-humanos.component.scss'],
})
export class AfiliadosRecursosHumanosComponent implements OnInit {

  memberForm: FormGroup;

  constructor(
    public location_: Location,
    public perfiles_: PerfilesService,
  ) {


    this.memberForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      cargo: new FormControl('', [Validators.required]),
      contacto: new FormControl('', [Validators.required]),
    })

    this.perfiles_.initialize('recursos_humanos')
  }

  ngOnInit(): void {
    this.perfiles_.editSubscription = this.perfiles_
      .listenEditingItem.subscribe(item => {
      this.memberForm.patchValue(item)
    })

  }

  async onSaveItem() {
    await this.perfiles_.saveItems(this.memberForm, 'recursos_humanos')
    let {updated, id, ...item} = emptyMember
    this.memberForm.setValue(item)
    this.memberForm.markAsPristine()
  }

  ngOnDestroy() {
    this.perfiles_.getOutSection()
  }


}
