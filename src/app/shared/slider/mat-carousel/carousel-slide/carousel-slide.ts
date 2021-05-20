import { SafeStyle } from '@angular/platform-browser';
import { Enlace } from '../../gdev-slide.model';

export interface MatCarouselSlide {
  image: SafeStyle;
  overlayColor: string;
  hideOverlay: boolean;
  disabled: boolean;
  enlace?:Enlace
}
