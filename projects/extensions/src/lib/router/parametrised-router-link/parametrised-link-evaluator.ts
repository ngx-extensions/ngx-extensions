import { Observable } from 'rxjs';
import { InjectionToken } from '@angular/core';

export interface IParametrisedLinkEvaluator {
  observeEvaluatedLink(parametrisedLink: string): Observable<string>;
  evaluateParametrisedLink(parametrisedLink: string): string;
  evaluateParameterToken(token: string): string;
}

export const NGX_EVALUATION_OPTIONS = new InjectionToken<EvaluationOptions>(
  'NGX_EVALUATION_OPTIONS'
);

export interface EvaluationOptions {
  tokenPattern: RegExp;
  tokenPrefixPattern: RegExp;
}

export class DefaultEvaluationOptions implements EvaluationOptions {
  readonly tokenPattern = /(:\w*)/g;
  readonly tokenPrefixPattern = /^:/;
}

export abstract class BaseParametrisedLinkEvaluator
  implements IParametrisedLinkEvaluator {
  get tokenPattern() {
    return this.options.tokenPattern;
  }

  get tokenPrefixPattern() {
    return this.options.tokenPrefixPattern;
  }

  constructor(private readonly options: EvaluationOptions) {}

  abstract observeEvaluatedLink(parametrisedLink: string): Observable<string>;

  abstract evaluateParametrisedLink(parametrisedLink: string): string;

  abstract evaluateParameterToken(token: string): string;
}

export function findUniqueParameterTokens(
  parametrisedLink: string,
  tokenPattern: RegExp
): string[] {
  const patternMatches = parametrisedLink.match(tokenPattern);
  return Array.from(new Set(patternMatches));
}
