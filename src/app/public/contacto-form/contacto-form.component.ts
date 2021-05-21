import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxAlert, MxText } from '@marxa/devkit';

@Component({
  selector: 'g-contacto-form',
  templateUrl: './contacto-form.component.html',
  styleUrls: ['./contacto-form.component.scss']
})
export class ContactoFormComponent implements OnInit {

  contactoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    area_cel: new FormControl(52),
    celular: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    mensaje: new FormControl('', [Validators.required])
  })
  sended: boolean = false
  constructor(
    public text: MxText,
    private _afs: AngularFirestore,
    private _alert: MxAlert
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this._afs.collection('mensajes_publicos').add({
      ...this.contactoForm.value,
      enviado: new Date()
    }).then(() => {
      this._alert.notify('enviado')
      this.sended = true
    })
  }


}
