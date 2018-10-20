/**
 * @license
 * Copyright 2018 © Robert BOSCH GmbH. All rights reserved.
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ngxNestedValue'
})
export class NgxNestedValuePipe implements PipeTransform {
  transform(value: any, name: string): any {
    if (Array.isArray(value) || !(value instanceof Object) || !name) {
      return value;
    } else if (name.indexOf('.') > -1) {
      const splitName: string[] = name.split(/\.(.+)/, 2);
      return this.transform(value[splitName[0]], splitName[1]);
    } else {
      return value[name];
    }
  }
}
