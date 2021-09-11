import { Directive, ElementRef, Input, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Directive({
  selector: '[gImageBg]'
})
export class BgImageDirective implements OnDestroy {

  // @Input() gImageBg: string = ''
  private _gImageBg : BehaviorSubject<string> = new BehaviorSubject('');
  @Input() set gImageBg(image: string) { this._gImageBg.next(image); }
  get gImageBg() { return this._gImageBg.getValue() }
  imageSubscription: Subscription

  constructor(
    private el: ElementRef,
  ) {
    this.imageSubscription =
      this._gImageBg.subscribe( image => {
      // console.log( image )
      if (image) {
        this.el.nativeElement.style.background = `url(${image})`
        this.el.nativeElement.style.backgroundPosition = 'center'
        this.el.nativeElement.style.backgroundSize = 'cover'
      }
    })
  }

  ngOnDestroy() {
    this.imageSubscription.unsubscribe()
  }

}
