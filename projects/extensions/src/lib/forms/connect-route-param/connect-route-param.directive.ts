import { OnInit, Directive, Input, OnDestroy, Host } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';

@Directive({
  selector: `
    [ngxConnectRouteParam][ngModel],
    [ngxConnectRouteParam][formControl],
    [ngxConnectRouteParam][formControlName]
  `
})
export class NgxConnectRouteParam implements OnInit, OnDestroy {
  private _paramKeySubject = new BehaviorSubject<string>(undefined);
  private _destroySubject = new Subject<void>();

  @Input('ngxConnectRouteParam')
  get queryParamKey() {
    return this._paramKeySubject.value;
  }
  set queryParamKey(v: string) {
    this._paramKeySubject.next(v);
  }

  @Input()
  valueTransform: Function;

  @Input()
  updateOnParamChange = false;

  constructor(
    @Host() public readonly ngControl: NgControl,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.initParamKey();
    this.setControlValue(this.queryParamKey, this.currentParams);

    const onUpdate: (value: [string, ParamMap]) => void = ([key, params]) =>
      this.setControlValue(key, params);
    this.generateUpdateStream().subscribe(onUpdate);
  }

  ngOnDestroy() {
    this._destroySubject.next();
    this._destroySubject.complete();
  }

  private initParamKey() {
    this.queryParamKey = this.queryParamKey || this.ngControl.name;
  }

  private get currentParams() {
    return this.route.snapshot.paramMap;
  }

  private generateUpdateStream() {
    const key$ = this._paramKeySubject.asObservable();
    const params$ = this.route.paramMap;
    return combineLatest(key$, params$).pipe(
      map(values => (this.updateOnParamChange ? values : null)),
      filter(values => !!values),
      takeUntil(this._destroySubject)
    );
  }

  private setControlValue(key: string, params: ParamMap) {
    const rawValue = params.get(key);
    const transformedValue = this.valueTransform
      ? this.valueTransform(rawValue)
      : rawValue;
    this.ngControl.control.patchValue(transformedValue);
  }
}
