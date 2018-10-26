import { TestBed } from '@angular/core/testing';
import {
  FormControl,
  ReactiveFormsModule,
  DefaultValueAccessor,
  FormControlName,
  FormGroupDirective,
  FormsModule
} from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  convertToParamMap,
  ActivatedRouteSnapshot
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { Observable, Subject } from 'rxjs';

import { NgxFormsModule } from '../forms.module';
import { NgxConnectQueryParam } from './connect-query-param.directive';

describe('NgxConnectQueryParam', () => {
  let fakeActivatedRoute: ActivatedRoute;
  let paramSubject: Subject<Params>;

  beforeEach(() => {
    fakeActivatedRoute = new ActivatedRoute();
    paramSubject = new Subject<Params>();
  });

  beforeEach(() => {
    setQueryParamSource(fakeActivatedRoute, paramSubject.asObservable());
    setQueryParamSnapshot(fakeActivatedRoute, {});
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxFormsModule, ReactiveFormsModule, FormsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: fakeActivatedRoute
        }
      ]
    });
  });

  afterEach(() => {
    paramSubject.complete();
    fakeActivatedRoute = null;
  });

  describe('with [formControlName]', () => {
    const controlName = 'name';
    let defaultAccessor: DefaultValueAccessor;
    let formModel: FormControl;
    let parent: FormGroupDirective;
    let controlNameDir: FormControlName;

    beforeEach(() => {
      // tslint:disable-next-line:no-non-null-assertion
      defaultAccessor = new DefaultValueAccessor(null!, null!, null!);
      formModel = new FormControl('name');
      parent = new FormGroupDirective([], []);
      controlNameDir = new FormControlName(
        parent,
        [],
        [],
        [defaultAccessor],
        null
      );
      controlNameDir.name = controlName;
      (controlNameDir as { control: FormControl }).control = formModel;
    });

    it('should correctly create and reflect initial state of the form control', () => {
      const uut = new NgxConnectQueryParam(controlNameDir, fakeActivatedRoute);

      expect(uut).toBeTruthy();
      expect(uut.ngControl.value).toBe(formModel.value);
    });

    describe('after ngOnInit', () => {
      it('should reflect initial state of route snapshot after "ngOnInit"', () => {
        const expectedQueryParams = { [controlName]: 'foo' };
        setQueryParamSnapshot(fakeActivatedRoute, expectedQueryParams);

        const uut = createUnitUnderTest();
        uut.ngOnInit();

        expect(uut).toBeTruthy();
        expect(formModel.value).toBe(expectedQueryParams[controlName]);
      });

      it('should reflect initial state of route snapshot for given name after "ngOnInit"', () => {
        const aPropertyName = 'something';
        const expectedQueryParams = { [aPropertyName]: 'foo' };
        setQueryParamSnapshot(fakeActivatedRoute, expectedQueryParams);

        const uut = createUnitUnderTest();
        uut.queryParamKey = aPropertyName;
        uut.ngOnInit();

        expect(uut).toBeTruthy();
        expect(formModel.value).toBe(expectedQueryParams[aPropertyName]);
      });

      it('should reflect transformed initial state of route snapshot, when "transformValue" is set', () => {
        const testRouteParams = { [controlName]: 'foo' };
        const transformToUpper: (value: string) => string = value =>
          value.toUpperCase();
        setQueryParamSnapshot(fakeActivatedRoute, testRouteParams);

        const uut = createUnitUnderTest();
        uut.valueTransform = transformToUpper;
        uut.ngOnInit();

        expect(uut.ngControl.value).toBe(
          transformToUpper(testRouteParams[controlName])
        );
      });
    });

    function createUnitUnderTest() {
      return new NgxConnectQueryParam(controlNameDir, fakeActivatedRoute);
    }
  });
});

function setQueryParamSource(
  route: ActivatedRoute,
  params$: Observable<Params>
): ActivatedRoute {
  route.queryParams = params$;
  return route;
}

function setQueryParamSnapshot(
  route: ActivatedRoute,
  queryParams: Object
): ActivatedRoute {
  const queryParamMap = convertToParamMap(queryParams);
  route.snapshot = <ActivatedRouteSnapshot>{ queryParamMap };
  return route;
}
