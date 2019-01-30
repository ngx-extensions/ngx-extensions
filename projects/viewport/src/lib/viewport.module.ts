import { NgModule, ModuleWithProviders } from '@angular/core';

import { NgxViewportObserver } from './viewport-observer.directive';
import { INTERSECTION_OBSERVER_INIT, defaultIntersectionObserverInit } from './intersection.service';

export interface NgxViewportModuleConfig {
  intersectionObserverInit?: IntersectionObserverInit;
}

@NgModule({
  declarations: [NgxViewportObserver],
  exports: [NgxViewportObserver]
})
export class NgxViewportModule {
  static forRoot(config: NgxViewportModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxViewportModule,
      providers: [
        {
          provide: INTERSECTION_OBSERVER_INIT,
          useValue: config.intersectionObserverInit || defaultIntersectionObserverInit
        }
      ]
    };
  }
}
