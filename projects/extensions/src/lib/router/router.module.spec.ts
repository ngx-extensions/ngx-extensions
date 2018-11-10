import { TestBed } from '@angular/core/testing';

import { NgxRouterModule } from './router.module';
import {
  NGX_EVALUATION_OPTIONS,
  DefaultEvaluationOptions
} from './parametrised-router-link/parametrised-link-evaluator';

describe('NgxRouterModule', () => {
  it('should correctly be created', () => {
    const uut = new NgxRouterModule();

    expect(uut).toBeTruthy();
  });

  describe('forRoot', () => {
    it(`should correctly resolve "${NGX_EVALUATION_OPTIONS}" into "${DefaultEvaluationOptions}" as default`, () => {
      TestBed.configureTestingModule({
        imports: [NgxRouterModule.forRoot()]
      });

      const resolved = TestBed.get(NGX_EVALUATION_OPTIONS);

      expect(resolved instanceof DefaultEvaluationOptions).toBeTruthy();
    });

    it(`should correctly resolve "${NGX_EVALUATION_OPTIONS}" into a custom provider`, () => {
      const expectedValue = {};
      TestBed.configureTestingModule({
        imports: [
          NgxRouterModule.forRoot({
            evaluationOptions: {
              provide: NGX_EVALUATION_OPTIONS,
              useValue: expectedValue
            }
          })
        ]
      });

      const resolved = TestBed.get(NGX_EVALUATION_OPTIONS);

      expect(resolved).toEqual(expectedValue);
    });

    it('should correctly set a default provider when no arguments are given', () => {
      const { ngModule, providers } = NgxRouterModule.forRoot();

      expect(ngModule).toBe(NgxRouterModule);
      expect(providers).toBeTruthy();
      expect(providers).toContain(
        jasmine.objectContaining({
          provide: NGX_EVALUATION_OPTIONS,
          useClass: DefaultEvaluationOptions
        })
      );
    });
  });
});
