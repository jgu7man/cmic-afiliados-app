import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxFixScroll } from './fix-scroll.directive';



@NgModule({
  declarations: [
    MxFixScroll
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MxFixScroll
  ]
})
export class MxResponsiveModule { }
