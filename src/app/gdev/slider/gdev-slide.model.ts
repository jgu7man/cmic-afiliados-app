import { ThemePalette } from "@angular/material/core";
import { Orientation } from "./mat-carousel/carousel";

export class SlideModel {
  constructor(
    public nombre: string,
    public imageURL: string,
    public activado: boolean,
    public enlace?: Enlace,
    public newTab?: boolean,
    public id?: string,
  ) {

  }
}



export interface Enlace {
  url: string,
  newTab: boolean
}


export interface SliderConfig {
  timings:string
  autoplay:boolean
  interval: number
  color: ThemePalette
  maxWidth:string
  proportion: number
  slides: number
  loop: boolean
  hideArrows: boolean
  hideIndicators: boolean
  useKeyboard:boolean
  useMouseWheel:boolean
  orientation: Orientation
  maintainAspectRatio: boolean
  slideHeight?:string
}
