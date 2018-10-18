import { Injectable, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';

import {
  BaseParametrisedLinkEvaluator,
  EvaluationOptions,
  NGX_EVALUATION_OPTIONS,
  findUniqueParameterTokens
} from './parametrised-link-evaluator';

@Injectable()
export class RouteParametrisedLinkEvaluator extends BaseParametrisedLinkEvaluator {
  constructor(
    private readonly route: ActivatedRoute,
    @Inject(NGX_EVALUATION_OPTIONS) options: EvaluationOptions
  ) {
    super(options);
  }

  observeEvaluatedLink(parametrisedLink: string): Observable<string> {
    // TODO optimize: create a stream that emit
    // new events only when the values associated to the param
    // tokens in the link are changed. This is partially
    // solved by adding distinctUntilChanged to the pipeline

    // TODO refactor: the evaluation of the parametrised link
    // should take the value emited by paramMap as argument instead
    // of ignoring it
    return this.route.paramMap.pipe(
      map(_ => this.evaluateParametrisedLink(parametrisedLink)),
      distinctUntilChanged()
    );
  }

  evaluateParametrisedLink(parametrisedRouterLink: string): string {
    if (!parametrisedRouterLink) {
      return null;
    }

    const paramTokens = findUniqueParameterTokens(
      parametrisedRouterLink,
      this.tokenPattern
    );
    const paramValueMap = new Map<string, string>();
    for (const paramToken of paramTokens) {
      const paramValue = this.evaluateParameterToken(paramToken);
      if (!paramValue) {
        // As soon as the evaluation of a token
        // results in null, stop iterating
        break;
      }
      paramValueMap.set(paramToken, paramValue);
    }
    const aTokenEvaluationResultedInNull =
      paramValueMap.size !== paramTokens.length;
    if (aTokenEvaluationResultedInNull) {
      return null;
    }
    return paramTokens.reduce(
      (acc, token) => acc.replace(token, paramValueMap.get(token)),
      parametrisedRouterLink
    );
  }

  evaluateParameterToken(token: string): string {
    return !!token
      ? this.route.snapshot.paramMap.get(this.removeTokenPrefix(token))
      : null;
  }

  private removeTokenPrefix(token: string): string {
    return token.replace(this.tokenPrefixPattern, '');
  }
}
