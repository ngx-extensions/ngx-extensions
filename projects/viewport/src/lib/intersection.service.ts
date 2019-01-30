import { Injectable, Inject, InjectionToken, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

export const INTERSECTION_OBSERVER_INIT = new InjectionToken<IntersectionObserverInit>('INTERSECTION_OBSERVER_INIT');

export const defaultIntersectionObserverInit: IntersectionObserverInit = {
  rootMargin: '0px',
  threshold: 0,
  root: null
};

@Injectable()
export class NgxIntersectionService implements OnDestroy {
  private readonly defaultObserver: IntersectionObserver;
  private readonly defaultObserverCallback$ = new Subject<IntersectionObserverEntry>();

  constructor(
    @Inject(INTERSECTION_OBSERVER_INIT)
    private readonly intersectionObserverInit: IntersectionObserverInit
  ) {
    this.defaultObserver = new IntersectionObserver(
      this.createHandler(this.defaultObserverCallback$),
      this.intersectionObserverInit
    );
  }

  ngOnDestroy() {
    this.defaultObserver.disconnect();
  }

  observe(element: Element): Observable<IntersectionObserverEntry> {
    this.defaultObserver.observe(element);
    return this.defaultObserverCallback$.asObservable().pipe(filter(entry => entry.target === element));
  }

  unobserver(element: Element) {
    this.defaultObserver.unobserve(element);
  }

  private createHandler(callback$: Subject<IntersectionObserverEntry>): IntersectionObserverCallback {
    return entries => callback$.next(...entries);
  }
}
