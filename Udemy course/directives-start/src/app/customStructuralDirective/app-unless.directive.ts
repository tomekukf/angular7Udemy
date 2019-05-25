import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appAppUnless]'
})
export class AppUnlessDirective {


  @Input()
  set appAppUnless(condition: boolean){
    if (!condition){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  constructor(private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef ) { }

}
