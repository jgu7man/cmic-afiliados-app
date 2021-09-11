import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
import { GdevSliderService } from '../gdev-slider.service';
import { Router } from '@angular/router';
import { SlideModel, SliderConfig } from '../gdev-slide.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'gdev-slider',
  templateUrl: './gdev-slider.component.html',
  styleUrls: ['./gdev-slider.component.scss']
})
export class GdevSliderComponent implements OnInit, OnDestroy {
  sliderConfig: SliderConfig

  slides: SlideModel[] = [];
  @Input() slidesCollection: string = ''
  private slidesSubscription!: Subscription

  constructor (
    public _slider: GdevSliderService,
    private router: Router
  ) {
    this.sliderConfig = this._slider.sliderConfig
   }


  ngOnInit(): void {
    this._slider.loadConfiguration(this.slidesCollection)
    this.loadSliderConfig()
    this.loadSlides()
  }

  loadSliderConfig() {
    this.slidesSubscription = this._slider.$sliderConfig
      .subscribe( config => {
        // console.log( config )
      this.sliderConfig = config
    })
  }

  async loadSlides() {
    this.slides = await this._slider.loadSlides( this.slidesCollection )
  }

  ngOnDestroy() {
    this.slidesSubscription.unsubscribe()
  }

}
