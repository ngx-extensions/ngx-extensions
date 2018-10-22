import { Pipe, PipeTransform } from '@angular/core';

/**
 * Extracts a nested property value from an object
 */
@Pipe({
  name: 'ngxNestedValue'
})
export class NgxNestedValuePipe implements PipeTransform {
  transform(value: any, path: string): any {
    if (Array.isArray(value) || !(value instanceof Object) || !path) {
      return value;
    } else if (path.indexOf('.') > -1) {
      const splitName: string[] = path.split(/\.(.+)/, 2);
      return this.transform(value[splitName[0]], splitName[1]);
    } else {
      return value[path];
    }
  }
}
