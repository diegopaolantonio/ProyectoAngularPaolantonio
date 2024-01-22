import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appFontSize]',
})
export class FontSizeDirective implements OnChanges {
  @Input()
  size = '10px';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderFontSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['size']) {
      this.renderFontSize();
    }
  }

  renderFontSize(): void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'font-size',
      this.size
    );
  }
}
