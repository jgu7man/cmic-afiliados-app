import { AfterViewInit, Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[fixScroll]',
})
export class MxFixScroll implements AfterViewInit {

  @Input() topBreak?: number;
  @Input() bottomBreak?: number;
  @Input() bottomSelector?: string;
  private _bottom: any

  @Input() position: string = 'absolute';
  @Input() height?: number | string = '100vh';


  constructor(
    private element: ElementRef
  ) {}


  ngAfterViewInit() {
    this.height = typeof this.height === 'number'
      ? `${this.height}vh` : this.height;
    this.element.nativeElement.style.height = `${this.height}`;
    this.element.nativeElement.style.position = this.position
  }


  @HostListener('window:scroll', ['$event'])
  onScroll($event: any) {
    if (this.bottomSelector) {
      this._bottom = document.querySelector(this.bottomSelector)
    }

    let window = $event.target.scrollingElement;
    let scrollOffset = window.scrollTop;
    let clientHeight = window.clientHeight;
    let bottomBreak = this.bottomBreak
      ? this.bottomBreak - clientHeight
      : this.bottomSelector
        ? this._bottom.offsetTop - clientHeight
        : clientHeight;

    if (this.topBreak) {
      // Regresar a la position original
      if (scrollOffset < this.topBreak) {
        this.element.nativeElement.style.position = this.position;
        // Fijar pasando el punto de quiebre superior
      } else if (scrollOffset > this.topBreak && scrollOffset < bottomBreak) {
        this.element.nativeElement.style.position = 'fixed';
        this.element.nativeElement.style.top = '0px';
        // Anclar al punto de quiebe inferior
      } else if (scrollOffset > bottomBreak) {
        this.element.nativeElement.style.position = 'absolute';
        this.element.nativeElement.style.top = `${
          bottomBreak - this.topBreak
        }px`;
      }
    }
  }



}
