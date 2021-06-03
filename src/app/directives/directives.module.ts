import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BgImageDirective } from './bg-image.directive';



@NgModule({
  declarations: [BgImageDirective],
  imports: [
    CommonModule
  ],
  exports: [BgImageDirective]
})
export class DirectivesModule { }
