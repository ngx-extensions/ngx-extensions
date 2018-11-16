import {
  Directive,
  Input,
  ElementRef,
  AfterViewInit,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';
import {
  coerceBooleanProperty,
  coerceNumberProperty
} from '@angular/cdk/coercion';
import * as CountUp from 'countup.js';
import { CountUpOptions } from 'countup.js';

@Directive({
  selector: '[ngxCountUp]',
  exportAs: 'ngxCountUp'
})
export class NgxCountUpDirective implements AfterViewInit {
  private static readonly LARGE_VALUE_FIX: number = 100;

  /**
   * The options for the countUp.js API.
   * Defaults to undefined.
   */
  @Input('ngxCountUp')
  options: CountUpOptions;

  /**
   * The value to count up to.
   * Defaults to zero.
   */
  @Input()
  get endValue() {
    return this._endValue;
  }
  set endValue(v: any) {
    this._endValue = coerceNumberProperty(v);
    if (!!this.countUp) {
      // TODO refactor to simply animate()?
      this.countUp.update(this.endValue);
    }
  }

  /**
   * Whether or not the element should re-animate when clicked.
   * Default is false.
   */
  @Input()
  get reanimateOnClick() {
    return this._reanimateOnClick;
  }
  set reanimateOnClick(v: any) {
    this._reanimateOnClick = coerceBooleanProperty(v);
  }

  /**
   * Duration of the animation in seconds.
   * Defaults to 2[s].
   */
  @Input()
  get duration() {
    return this._duration;
  }
  set duration(v: any) {
    this._duration = coerceNumberProperty(v);
  }

  /**
   * Optional number of decimal places.
   * Default is zero.
   */
  @Input()
  decimals = 0;

  /**
   * Optional start value for the count.
   * Defaults to zero.
   */
  @Input()
  get startValue() {
    return this._startValue;
  }
  set startValue(v: any) {
    this._startValue = coerceNumberProperty(v);
  }

  /**
   * Emits when the count-up animation has completed
   */
  @Output()
  readonly animationStarted = new EventEmitter<void>();

  /**
   * Emits when the count-up animation has started
   */
  @Output()
  readonly animationCompleted = new EventEmitter<void>();

  private _startValue = 0;
  private _endValue = 0;
  private _duration = 2;
  private _reanimateOnClick = false;
  private countUp: CountUp;

  constructor(private readonly elementRef: ElementRef) {}

  ngAfterViewInit() {
    this.countUp = this.createCountUp();
    this.animate();
  }

  /**
   * Handles the click event of the host element
   */
  @HostListener('click')
  onClick() {
    if (this.reanimateOnClick) {
      this.animate();
    }
  }

  /**
   * Triggers the count-up animation.
   */
  animate() {
    this.countUp.reset();
    this.onAnimationStarted();
    if (this.endValue > 999) {
      this.countUp.start(() =>
        this.onAnimationCompleted(() => this.countUp.update(this.endValue))
      );
    } else {
      this.countUp.start(() => this.onAnimationCompleted());
    }
  }

  private createCountUp(): CountUp {
    const diff = Math.abs(this.endValue - this.startValue);
    const countUpFactory: (endValue: number, duration: number) => CountUp = (
      endValue,
      duration
    ) =>
      new CountUp(
        this.elementRef.nativeElement,
        this.startValue,
        endValue,
        this.decimals,
        duration,
        this.options
      );
    let countUp: CountUp;

    if (diff > 999) {
      const fixFactor = this.endValue > this.startValue ? -1 : 1;
      const calculatedEnd =
        this.endValue + fixFactor * NgxCountUpDirective.LARGE_VALUE_FIX;
      countUp = countUpFactory(calculatedEnd, this.duration / 2);
    } else {
      countUp = countUpFactory(this.endValue, this.duration);
    }
    return countUp;
  }

  private onAnimationStarted() {
    this.animationStarted.emit();
  }

  private onAnimationCompleted(fn?: Function) {
    this.animationCompleted.emit();
    if (!!fn) {
      fn();
    }
  }
}
