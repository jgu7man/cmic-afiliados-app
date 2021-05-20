import { Component, Input, OnInit } from '@angular/core';
import { GdevSliderService } from '../gdev-slider.service';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { MatSliderChange } from '@angular/material/slider';
import { Location } from '@angular/common';
import { SliderConfig } from '../gdev-slide.model';


interface FX { value: string, display: string }
interface Orientacion { value: string, display: string }
@Component({
  selector: 'app-gdev-slider-config',
  templateUrl: './gdev-slider-config.component.html',
  styleUrls: ['./gdev-slider-config.component.scss']
})
export class GdevSliderConfigComponent implements OnInit {


  SliderConfig: SliderConfig
  timing: number
  efect: string
  maxWidth: number
  slideHeight
  efects: FX[] = [
    { value: 'ease-in', display: 'Entrada suave' },
    { value: 'ease-out', display: 'Salida suave' },
    { value: 'ease-in-out', display: 'Entrada y salida suave' }
  ]
  orientaciones: Orientacion[] = [
    { value: 'ltr', display: 'Izquierda a derecha' },
    { value: 'rtl', display: 'Derecha a izquierda' },
  ]

  @Input() collection?: string

  constructor (
    private _slider: GdevSliderService,
    public location: Location
  ) {
    this.SliderConfig = this._slider.sliderConfig
    this.timing = 250
    this.efect = 'ease-in'
    this.maxWidth = 100
    this.slideHeight = 100
  }

  ngOnInit(): void {
    this._slider.$sliderConfig.subscribe( config => {
      if ( config ) {
        this.SliderConfig = config
        this.timing = +config.timings.split('ms')[0]
        this.efect = config.timings.split(' ')[1]
        this.maxWidth = config.maxWidth != 'auto' ?
          +config.maxWidth.split('%')[0] : 100
        this.slideHeight = config.slideHeight ?
          +config.slideHeight.split('px')[0] : 100
      }
    })
  }

  formatLabel( value: number ) {
    if ( value >= 1 ) {
      return Math.round( value / 1 ) + '%';
    } return value;
  }



  onMaxwidth( event: MatSlideToggleChange ) {
    console.log(event.checked);
    this.SliderConfig.maxWidth = event.checked ? 'auto' : ''
    console.log( this.SliderConfig.maxWidth);
  }





  onSubmit() {
    this.SliderConfig.timings = `${ this.timing }ms ${ this.efect }`
    this.SliderConfig.maxWidth = this.SliderConfig.maxWidth == 'auto' ?
      'auto' : `${ this.maxWidth }%`;
    if ( !this.SliderConfig.maintainAspectRatio ) {
      this.SliderConfig.slideHeight = this.slideHeight + 'px'
    } else {
      delete this.SliderConfig.slideHeight
    }


    console.log( this.SliderConfig );
    this._slider.setSliderConfiguration(this.SliderConfig, this.collection)
  }

}
