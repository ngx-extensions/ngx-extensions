import { Pipe, PipeTransform } from '@angular/core';
import { isString, isNull, isUndefined, is } from 'ts-type-guards';

@Pipe({
  name: 'ngxReplace'
})
export class NgxReplacePipe implements PipeTransform {
  transform(value: any, pattern: any, replace?: any): string {
    if (isNullUndefined(value)) {
      return value;
    }
    if (!isString(value)) {
      throw new Error(
        `Invalid value argument. The ${
          NgxReplacePipe.name
        } pipe expects a string as "value" argument`
      );
    }

    if (isNullUndefined(pattern)) {
      return value;
    }
    if (!isString(pattern) && !is(RegExp)(pattern)) {
      throw new Error(
        `Invalid pattern argument. The ${
          NgxReplacePipe.name
        } pipe expects either a string or RegExp instance as "pattern" argument`
      );
    }

    // If the replace argument was passed, and is not a string
    if (!isNullUndefined(replace) && !isString(replace)) {
      throw new Error(
        `Invalid replace argument. The ${
          NgxReplacePipe.name
        } pipe expects a string or null/undefined as "replace" argument.`
      );
    }

    return value.replace(pattern, replace || '');
  }
}

function isNullUndefined(value: any): value is null | undefined {
  return isNull(value) || isUndefined(value);
}
