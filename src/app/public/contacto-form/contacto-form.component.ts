import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'g-contacto-form',
  templateUrl: './contacto-form.component.html',
  styleUrls: ['./contacto-form.component.scss']
})
export class ContactoFormComponent implements OnInit {

  contactoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email]),
    celular: new FormControl('', [Validators.required]),
    mensaje: new FormControl('', [Validators.required])
  })
  constructor() { }

  ngOnInit(): void {
  }



}
