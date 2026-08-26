import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  Renderer2,
} from '@angular/core';

interface IGradientConfiguration {
  delay?: number;
  colors?: string[];
  thickness?: number;
}

@Directive({
  selector: '[appAnimatedGradientBorder]',
})
export class AnimatedGradientBorderDirective implements OnDestroy {
  ngOnDestroy(): void {
    this.clearTimer();
  }

  @Input() GradientConfiguration: IGradientConfiguration = {};
  private timer: ReturnType<typeof setTimeout> | null = null;
  private elementRef: ElementRef = inject(ElementRef);
  private renderer: Renderer2 = inject(Renderer2);

  @HostListener('mouseenter')
  onEnter(): void {
    this.clearTimer();
    const delay = this.GradientConfiguration.delay ?? 1000;
    const colors = this.GradientConfiguration.colors ?? ['yellow', 'red', 'blue'];
    const thickness = this.GradientConfiguration.thickness ?? 2;

    const gradient = `linear-gradient(90deg, ${colors.join(', ')})`;

    this.timer = setTimeout(() => {
      const element = this.elementRef.nativeElement;

      this.renderer.setStyle(element, 'border', `${thickness}px solid transparent`);

      this.renderer.setStyle(element, 'border-image-source', gradient);

      this.renderer.setStyle(element, 'border-image-slice', '1');

      this.renderer.addClass(element, 'animated-gradient-border');
      this.timer = null;
    }, delay);
  }

  private clearTimer(): void {
    if (this.timer !== null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  @HostListener('mouseleave')
  onLeave(): void {
    this.clearTimer();
    const element = this.elementRef.nativeElement;
    this.renderer.removeStyle(element, 'border');
    this.renderer.removeStyle(element, 'border-image-source');
    this.renderer.removeStyle(element, 'border-image-slice');
    this.renderer.removeClass(element, 'animated-gradient-border');
  }
}
