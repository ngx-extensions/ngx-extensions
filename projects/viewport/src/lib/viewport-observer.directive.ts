import { Directive, Input, Output, EventEmitter, OnDestroy, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[ngxViewportObserver]',
  exportAs: 'ngxViewportObserver'
})
export class NgxViewportObserver implements OnInit, OnDestroy {
  private observer: IntersectionObserver;
  private latestIntersection: IntersectionObserverEntry = null;

  /**
   * Either a single number or an array of numbers which indicate at what percentage of
   * the target's visibility the underlying intersection observer's callback should be executed.
   * If you only want to detect when visibility passes the 50% mark, you can use a value of 0.5.
   * If you want the callback to run every time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1].
   * The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
   * A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
   */
  @Input() intersectionTreshold: number | number[] = 0;

  @Output() readonly intersected = new EventEmitter<IntersectionObserverEntry>();

  get intersection(): IntersectionObserverEntry | null {
    return this.latestIntersection;
  }

  /**
   * Gets whether the host element is visible in the viewport or not.
   * True if it is, false otherwise.
   */
  get isVisible() {
    return !!this.latestIntersection ? this.latestIntersection.isIntersecting : false;
  }

  constructor(private readonly elemRef: ElementRef<HTMLElement>) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(this.callback, {
      root: null,
      rootMargin: '0px',
      threshold: this.intersectionTreshold
    });
    this.observer.observe(this.elemRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

  private callback: IntersectionObserverCallback = (entries, observer) => {
    for (const entry of entries) {
      this.intersected.emit(entry);
    }
    this.latestIntersection = entries[entries.length - 1];
  };
}
