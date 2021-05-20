import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MxText } from '@marxa/devkit';

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
  constructor(
    public text: MxText
  ) { }

  ngOnInit(): void {
  }



}
