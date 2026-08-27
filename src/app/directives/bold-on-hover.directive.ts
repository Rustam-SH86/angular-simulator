import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appBoldOnHover]',
})
export class BoldOnHoverDirective {
  @HostBinding('style.fontWeight')
  fontWeight = 'normal';

  @HostListener('mouseenter')
  onEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave')
  onLeave() {
    this.fontWeight = 'normal';
  }
}
