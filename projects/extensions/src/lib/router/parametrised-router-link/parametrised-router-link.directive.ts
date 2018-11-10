import {
  Directive,
  OnInit,
  OnDestroy,
  Host,
  ClassProvider
} from '@angular/core';
import { RouterLinkWithHref, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';

import { BaseParametrisedLinkEvaluator } from './parametrised-link-evaluator';
import { RouteParametrisedLinkEvaluator } from './route-parametrised-link-evaluator';

export abstract class BaseParametrisedRouterLink implements OnInit, OnDestroy {
  private readonly linkSubject: BehaviorSubject<string>;

  set routerLink(v: string) {
    this.linkSubject.next(v);
  }

  constructor(private readonly evaluator: BaseParametrisedLinkEvaluator) {
    this.linkSubject = new BehaviorSubject<string>(null);
  }

  ngOnInit() {
    const onEvaluation = (evaluatedLink: string) =>
      this.updateEvaluatedLink(evaluatedLink);
    this.generateEvaluationStream().subscribe(onEvaluation);
  }

  ngOnDestroy() {
    this.linkSubject.complete();
  }

  private generateEvaluationStream() {
    return this.linkSubject.asObservable().pipe(
      distinctUntilChanged(),
      switchMap(link => this.evaluator.observeEvaluatedLink(link))
    );
  }

  abstract updateEvaluatedLink(evaluatedLink: string);
}

// TODO should be more flexible
const LINK_EVALUATOR_PROVIDER: ClassProvider = {
  provide: BaseParametrisedLinkEvaluator,
  useClass: RouteParametrisedLinkEvaluator
};

@Directive({
  selector: ':not(a)[routerLink][ngxParametrised]',
  inputs: ['routerLink'],
  providers: [LINK_EVALUATOR_PROVIDER]
})
export class NgxParametrisedRouterLink extends BaseParametrisedRouterLink {
  constructor(
    @Host() private readonly hostDirective: RouterLink,
    evaluator: BaseParametrisedLinkEvaluator
  ) {
    super(evaluator);
  }

  updateEvaluatedLink(evaluatedLink: string) {
    if (this.hostDirective) {
      this.hostDirective.routerLink = evaluatedLink;
    }
  }
}

@Directive({
  selector: 'a[routerLink][ngxParametrised]',
  inputs: ['routerLink'],
  providers: [LINK_EVALUATOR_PROVIDER]
})
export class NgxParametrisedRouterLinkWithHref extends BaseParametrisedRouterLink {
  constructor(
    @Host() private readonly hostDirective: RouterLinkWithHref,
    evaluator: BaseParametrisedLinkEvaluator
  ) {
    super(evaluator);
  }

  updateEvaluatedLink(evaluatedLink: string) {
    if (this.hostDirective) {
      this.hostDirective.routerLink = evaluatedLink;
      // Invoking RouterLinkWithHref.ngOnChanges is required
      // in order to force it to recalculate the href value
      this.hostDirective.ngOnChanges({});
    }
  }
}
