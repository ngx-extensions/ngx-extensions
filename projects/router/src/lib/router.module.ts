import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import {
  NGX_EVALUATION_OPTIONS,
  DefaultEvaluationOptions,
  NgxParametrisedRouterLinkWithHrefDirective,
  NgxParametrisedRouterLinkDirective
} from './parametrised-router-link';

export interface NgxRouterModuleConfig {
  evaluationOptions?: Provider;
}

@NgModule({
  declarations: [
    NgxParametrisedRouterLinkWithHrefDirective,
    NgxParametrisedRouterLinkDirective
  ],
  exports: [
    NgxParametrisedRouterLinkWithHrefDirective,
    NgxParametrisedRouterLinkDirective
  ]
})
export class NgxRouterModule {
  /**
   * Use this method in your root module
   * as a plug-in for configuration options
   * @param config the configuration options
   */
  static forRoot(config: NgxRouterModuleConfig = {}): ModuleWithProviders {
    return {
      ngModule: NgxRouterModule,
      providers: [
        config.evaluationOptions || {
          provide: NGX_EVALUATION_OPTIONS,
          useClass: DefaultEvaluationOptions
        }
      ]
    };
  }
}
