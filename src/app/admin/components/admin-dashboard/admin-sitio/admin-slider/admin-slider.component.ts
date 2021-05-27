import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { MxAlert } from '@marxa/devkit';
import { MxStorage } from '@marxa/storage';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { SlideModel } from 'src/app/shared/slider/gdev-slide.model';
import { GdevSliderService } from 'src/app/shared/slider/gdev-slider.service';

@Component({
  selector: 'g-admin-slider',
  templateUrl: './admin-slider.component.html',
  styleUrls: ['./admin-slider.component.scss']
})
export class AdminSliderComponent implements OnInit, OnDestroy {

  slides: SlideModel[] = []
  currentSlide?: SlideModel
  slidesSubscription: Subscription
  constructor(
    private _slider: GdevSliderService,
    private _storage: MxStorage,
    private _alert: MxAlert
  ) {
    this.slidesSubscription = this._slider.getSlidesList('sitio')
      .subscribe(list => {this.slides = list})
  }

  ngOnInit(): void {
  }

  onChanges(event: any) {
    this.currentSlide = { ...this.currentSlide, ...event}
  }

  onAddSlide() {
    if (this.currentSlide)
    this._slider.addSlide(this.currentSlide, 'sitio' )
  }

  onUpdateSlide() {
    if (this.currentSlide) {
      this._slider.updateSlide(this.currentSlide, 'sitio')
      .then(() => this._alert.notify('Slide guardada'))
    }
  }

  ngOnDestroy() {
    this.slidesSubscription.unsubscribe()
  }

}
