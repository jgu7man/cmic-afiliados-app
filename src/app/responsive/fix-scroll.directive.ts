import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { element } from 'protractor';

@Directive({
  selector: '[fixScroll]'
})
export class MxFixScroll {

  @Input() topBreak?: number
  @Input() bottomBreak?: number
  @Input() position?: string
  @Input() height?: number | string = '100vh'


  constructor(
    private element: ElementRef
  ) {
    this.height = typeof this.height === 'number' ?
      `${this.height}vh` : this.height
    this.element.nativeElement.style.height = `${this.height}`
   }

  @HostListener('window:scroll', ['$event'])
  onScroll($event: any) {
    let window = $event.target.scrollingElement
    let scrollOffset = window.scrollTop;
    let clientHeight = window.clientHeight
    let bottomBreak = this.bottomBreak ? this.bottomBreak - clientHeight : clientHeight

    if (this.topBreak) {
      // if (this.bottomBreak) {

        // console.log( scrollOffset, bottomBreak )
        // Regresar a la position original
        if (scrollOffset < this.topBreak) {
          this.element.nativeElement.style.position = this.position;
          // Fijar pasando el punto de quiebre superior
        } else if (scrollOffset > this.topBreak && scrollOffset < bottomBreak) {
          this.element.nativeElement.style.position = "fixed";
          this.element.nativeElement.style.top = "0px";
          // Anclar al punto de quiebe inferior
        } else if (scrollOffset > bottomBreak) {
          this.element.nativeElement.style.position = "absolute";
          this.element.nativeElement.style.top = `${bottomBreak - this.topBreak}px`;
        }

      // } else {
      //   let bottomBreak = clientHeight
      //   if (scrollOffset > this.topBreak) {
      //     this.element.nativeElement.style.position = "fixed"
      //   } else {
      //     this.element.nativeElement.style.position = this.position
      //   }
      // }
    }





  }


}
