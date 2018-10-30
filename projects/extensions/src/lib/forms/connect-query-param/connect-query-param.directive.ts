import { Directive, Input, OnInit, OnDestroy, Host } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgControl } from '@angular/forms';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { map, filter, takeUntil } from 'rxjs/operators';

const identityValueTransform: (param: string) => any = param => param;

@Directive({
  selector: `
    [ngxConnectQueryParam][ngModel],
    [ngxConnectQueryParam][formControl],
    [ngxConnectQueryParam][formControlName]
  `
})
export class NgxConnectQueryParam implements OnInit, OnDestroy {
  private _paramKeySubject = new BehaviorSubject<string>(undefined);
  private _destroySubject = new Subject<void>();

  @Input('ngxConnectQueryParam')
  get queryParamKey() {
    return this._paramKeySubject.value;
  }
  set queryParamKey(v: string) {
    this._paramKeySubject.next(v);
  }

  @Input()
  valueTransform: Function = identityValueTransform;

  @Input()
  updateOnParamChange = false;

  constructor(
    @Host() public readonly ngControl: NgControl,
    private readonly route: ActivatedRoute
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
    return this.route.snapshot.queryParamMap;
  }

  private generateUpdateStream() {
    const key$ = this._paramKeySubject.asObservable();
    const params$ = this.route.queryParamMap;
    return combineLatest(key$, params$).pipe(
      map(values => (this.updateOnParamChange ? values : null)),
      filter(values => !!values),
      takeUntil(this._destroySubject)
    );
  }

  private setControlValue(key: string, params: ParamMap) {
    const rawQueryParamValue = params.get(key);
    this.ngControl.control.patchValue(this.valueTransform(rawQueryParamValue));
  }
}
