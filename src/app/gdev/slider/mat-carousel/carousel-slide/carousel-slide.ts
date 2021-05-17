import { SafeStyle } from '@angular/platform-browser';
import { Enlace } from '../../gdev-slider.service';

export interface MatCarouselSlide {
  image: SafeStyle;
  overlayColor: string;
  hideOverlay: boolean;
  disabled: boolean;
  enlace?:Enlace
}
