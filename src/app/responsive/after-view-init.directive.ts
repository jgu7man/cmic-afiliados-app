import { AfterViewInit, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[gAfterViewInit]'
})
export class AfterViewInitDirective implements AfterViewInit{
  @Input()
  set gAfterViewInit(context: any) {
    this.context.$implicit = this.context.gAfterViewInit = context;
    this.updateView();
  }

  context: any = {};
  waitFor = (ms:number) => {new Promise(r => setTimeout(r, ms))}

  constructor(
    private vcRef: ViewContainerRef,
    private templateRef: TemplateRef<any>) { }

  async ngAfterViewInit() {
    await new Promise((r) => {setTimeout(r, 1000)})
    this.vcRef.clear();
    this.vcRef.createEmbeddedView(this.templateRef, this.context);
  }
  updateView() {
  }
}
