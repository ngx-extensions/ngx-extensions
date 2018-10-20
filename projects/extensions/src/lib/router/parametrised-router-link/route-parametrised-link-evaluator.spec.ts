import { TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  convertToParamMap,
  Params
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { cold } from 'jasmine-marbles';

import {
  DefaultEvaluationOptions,
  NGX_EVALUATION_OPTIONS
} from './parametrised-link-evaluator';
import { RouteParametrisedLinkEvaluator } from './route-parametrised-link-evaluator';

describe('RouteParametrisedLinkEvaluator', () => {
  let fakeActivatedRoute: ActivatedRoute;
  let paramSubject: BehaviorSubject<Params>;
  let uut: RouteParametrisedLinkEvaluator;

  describe(`with ${DefaultEvaluationOptions.name}`, () => {
    beforeEach(() => {
      // This is required as the paramMap member is readonly
      paramSubject = new BehaviorSubject<Params>({});
      fakeActivatedRoute = new ActivatedRoute();

      TestBed.configureTestingModule({
        providers: [
          RouteParametrisedLinkEvaluator,
          {
            provide: ActivatedRoute,
            useValue: fakeActivatedRoute
          },
          {
            provide: NGX_EVALUATION_OPTIONS,
            useClass: DefaultEvaluationOptions
          }
        ]
      });
    });

    beforeEach(() => {
      uut = TestBed.get(RouteParametrisedLinkEvaluator);
    });

    afterEach(() => {
      paramSubject.complete();
      paramSubject = null;
      fakeActivatedRoute = null;
      uut = null;
    });

    it('should correctly be resolved', () => {
      expect(uut).toBeTruthy();
    });

    describe('observeEvaluatedLink', () => {
      it('should emit only once null, when given null', () => {
        const sMarble = '-a--b--c--|';
        const eMarble = '-n--------|';
        const source$ = createParamMapSource(sMarble, {
          a: {},
          b: {},
          c: { foo: 'test' }
        });
        const expected$ = cold(eMarble, { n: null });
        setRouteParamMapSource(fakeActivatedRoute, source$);

        const result$ = uut.observeEvaluatedLink(null);

        expect(result$).toBeObservable(expected$);
      });

      it('should emit null, whenever at least one parameter token has no matching route parameter', () => {
        const sMarble = '-a--b--a--c--|';
        const eMarble = '-q--w--q--w--|';
        const source$ = createParamMapSource(sMarble, {
          a: { fruit: 'apple', animal: 'dog' },
          b: { fruit: 'apple' },
          c: { animal: 'dog' }
        });
        const expected$ = cold(eMarble, {
          q: '/test/apple/dog',
          w: null
        });
        setRouteParamMapSource(fakeActivatedRoute, source$);

        const result$ = uut.observeEvaluatedLink('/test/:fruit/:animal');

        expect(result$).toBeObservable(expected$);
      });

      it('should emit new values, whenever at least one matching route parameter changes', () => {
        const sMarble = '-a--b--b--a--c--c--a--a--|';
        const eMarble = '-q--w-----q--e-----q-----|';
        const source$ = createParamMapSource(sMarble, {
          a: { fruit: 'apple', animal: 'dog' },
          b: { fruit: 'banana', animal: 'dog' },
          c: { fruit: 'banana', animal: 'cat' }
        });
        const expected$ = cold(eMarble, {
          q: '/test/apple/dog',
          w: '/test/banana/dog',
          e: '/test/banana/cat'
        });
        setRouteParamMapSource(fakeActivatedRoute, source$);

        const result$ = uut.observeEvaluatedLink('/test/:fruit/:animal');

        expect(result$).toBeObservable(expected$);
      });

      function createParamMapSource(marble: string, values: Object) {
        return cold(marble, values).pipe(
          // This step is required, as the internal implementation of
          // the evaluator does not care about the values emited by
          // the paramMap stream
          tap(params => setRouteParamSnapshot(fakeActivatedRoute, params))
        );
      }
    });

    describe('evaluateParameterToken', () => {
      it('should return null, when the given token has no matching route parameter', () => {
        setRouteParamSnapshot(fakeActivatedRoute, {});

        const result = uut.evaluateParameterToken(':foo');

        expect(result).toBeFalsy();
      });

      it('should return the associated route parameter', () => {
        const params = { foo: 'test' };
        setRouteParamSnapshot(fakeActivatedRoute, params);

        const result = uut.evaluateParameterToken(':foo');

        expect(result).toBe(params.foo);
      });

      it('should return null, when given null', () => {
        const result = uut.evaluateParameterToken(null);

        expect(result).toBeFalsy();
      });
    });

    describe('evaluateParametrisedLink', () => {
      it('should return null, when given null', () => {
        const result = uut.evaluateParametrisedLink(null);

        expect(result).toBeFalsy();
      });

      it('should return null, when a parameter token  has no matching route parameter', () => {
        const params = { fruit: 'apple', pokemon: 'pikachu' };
        setRouteParamSnapshot(fakeActivatedRoute, params);

        const result = uut.evaluateParametrisedLink(
          '/test/:fruit/:pokemon/:country'
        );

        expect(result).toBeFalsy();
      });

      it('should return the evaluated link', () => {
        const params = { fruit: 'apple', pokemon: 'pikachu' };
        setRouteParamSnapshot(fakeActivatedRoute, params);

        const result = uut.evaluateParametrisedLink('/test/:fruit/:pokemon');

        expect(result).toBe(`/test/${params.fruit}/${params.pokemon}`);
      });
    });
  });
});
function setRouteParamMapSource(
  route: ActivatedRoute,
  params$: Observable<Params>
): ActivatedRoute {
  route.params = params$;
  return route;
}

function setRouteParamSnapshot(
  route: ActivatedRoute,
  object: Object
): ActivatedRoute {
  const paramMap = convertToParamMap(object);
  route.snapshot = <ActivatedRouteSnapshot>{ paramMap };
  return route;
}
