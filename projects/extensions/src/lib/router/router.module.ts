import { NgModule, ModuleWithProviders, Provider } from '@angular/core';

import {
  NgxParametrisedRouterLinkWithHrefDirective,
  NgxParametrisedRouterLinkDirective
} from './parametrised-router-link/parametrised-router-link.directive';
import {
  NGX_EVALUATION_OPTIONS,
  DefaultEvaluationOptions
} from './parametrised-router-link/parametrised-link-evaluator';

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