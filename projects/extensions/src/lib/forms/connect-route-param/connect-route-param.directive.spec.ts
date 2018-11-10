import { TestBed } from '@angular/core/testing';
import {
  ReactiveFormsModule,
  FormsModule,
  DefaultValueAccessor,
  FormControlName,
  FormControl,
  FormGroupDirective
} from '@angular/forms';
import {
  ActivatedRoute,
  Params,
  ActivatedRouteSnapshot,
  convertToParamMap
} from '@angular/router';
import { Subject, Observable } from 'rxjs';

import { NgxFormsModule } from '../forms.module';
import { NgxConnectRouteParam } from './connect-route-param.directive';

describe('NgxConnectRouteParam', () => {
  let fakeActivatedRoute: ActivatedRoute;
  let paramSubject: Subject<Params>;

  beforeEach(() => {
    fakeActivatedRoute = new ActivatedRoute();
    paramSubject = new Subject<Params>();
  });

  beforeEach(() => {
    setParamSnapshot(fakeActivatedRoute, {});
    setParamSource(fakeActivatedRoute, paramSubject.asObservable());
  });

  afterEach(() => {
    fakeActivatedRoute = null;
    paramSubject.complete();
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

    it('should correctly create and reflect the initial form control state', () => {
      const uut = createUnitUnderTest();

      expect(uut).toBeTruthy();
      expect(uut.ngControl.value).toBe(formModel.value);
    });

    describe('after ngOnInit', () => {
      it('should correctly reflect the initial value of the matching route params', () => {
        const testRouteParams = { [controlName]: 'foo' };
        setParamSnapshot(fakeActivatedRoute, testRouteParams);

        const uut = createUnitUnderTest();
        uut.ngOnInit();

        expect(uut.ngControl.value).toBe(testRouteParams[controlName]);
      });

      it('should reflect initial state of route snapshot for given name after "ngOnInit"', () => {
        const aPropertyName = 'something';
        const expectedQueryParams = { [aPropertyName]: 'foo' };
        setParamSnapshot(fakeActivatedRoute, expectedQueryParams);

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
        setParamSnapshot(fakeActivatedRoute, testRouteParams);

        const uut = createUnitUnderTest();
        uut.valueTransform = transformToUpper;
        uut.ngOnInit();

        expect(uut.ngControl.value).toBe(
          transformToUpper(testRouteParams[controlName])
        );
      });
    });

    function createUnitUnderTest() {
      return new NgxConnectRouteParam(controlNameDir, fakeActivatedRoute);
    }
  });
});

function setParamSource(
  route: ActivatedRoute,
  params$: Observable<Params>
): ActivatedRoute {
  route.params = params$;
  return route;
}

function setParamSnapshot(
  route: ActivatedRoute,
  params: Object
): ActivatedRoute {
  const paramMap = convertToParamMap(params);
  route.snapshot = <ActivatedRouteSnapshot>{ paramMap };
  return route;
}
