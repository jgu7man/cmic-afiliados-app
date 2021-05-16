import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MxFixScroll } from './fix-scroll.directive';
import { AfterViewInitDirective } from './after-view-init.directive';



@NgModule({
  declarations: [
    MxFixScroll,
    AfterViewInitDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MxFixScroll,
    AfterViewInitDirective
  ]
})
export class MxResponsiveModule { }
