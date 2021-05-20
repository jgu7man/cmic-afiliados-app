import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { iUploadedFile } from '@marxa/storage';
import { SlideModel } from 'src/app/shared/slider/gdev-slide.model';

@Component({
  selector: 'g-admin-slide',
  templateUrl: './admin-slide.component.html',
  styleUrls: ['./admin-slide.component.scss']
})
export class AdminSlideComponent implements OnInit, OnDestroy {


  slideForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    imageURL: new FormControl('', [Validators.required]),
    enlace: new FormControl(''),
    activado: new FormControl(false),
    newTab: new FormControl(true),
  })

  @Input() slide?: SlideModel

  changesSubscription: Subscription
  @Output() changes: EventEmitter<any> = new EventEmitter()
  constructor() {
    this.changesSubscription = this.slideForm.valueChanges
      .subscribe(data => {
        this.changes.emit(data)
      })
   }

  ngOnInit(): void {
    if (this.slide) this.slideForm.patchValue(this.slide)
  }

  onFileUploaded(files: iUploadedFile[]) {
    this.slideForm.patchValue({ imageURL: files[0].url })
    if (this.slide) this.slide.imageURL = files[0].url as string
  }

  ngOnDestroy(): void {
    this.changesSubscription.unsubscribe()
  }

}
