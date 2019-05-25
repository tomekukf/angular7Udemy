import {Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[appChangeColor]'
})
export class ChangeColorDirective implements OnInit{

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit() {
    // this.elementRef.
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue' );
  }

 @Input()
 defaultColor: string = 'transparent';
  @Input('appChangeColor')
  highLightColor: string = 'blue';

  @HostListener('mouseenter')
  mouseover(event: Event){
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue' );
    this.backgroundColor = this.highLightColor;
  }

  @HostListener('mouseleave')
  mouseleve(event: Event){
    // this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'transparent' );
    this.backgroundColor = this.defaultColor;
  }


  @HostBinding('style.backgroundColor')
  backgroundColor: string = this.defaultColor;


}
