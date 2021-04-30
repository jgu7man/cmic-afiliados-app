import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactoInteres } from '../../../models/afiliados.model';
import { ActividadesService } from '../../../services/actividades.service';

@Component({
  selector: 'g-intereses-form',
  templateUrl: './intereses-form.component.html',
  styleUrls: ['./intereses-form.component.scss']
})
export class InteresesFormComponent implements OnInit, OnDestroy {

  contactoForm: FormGroup = new FormGroup({
    intereses: new FormControl([]),
    nombre: new FormControl(''),
    telefono: new FormControl(''),
    puesto: new FormControl(''),
    email: new FormControl('')
  })

  @Output() changes: EventEmitter<any> = new EventEmitter();
  changesSubscription: Subscription = new Subscription()

  constructor(
    public actividades_: ActividadesService,
  ) { }

  ngOnInit(): void {
    this.changesSubscription =
    this.contactoForm.valueChanges
      .subscribe(data => {
      this.changes.emit(data)
    })
  }

  ngOnDestroy() {
    this.changesSubscription.unsubscribe()
  }

}
