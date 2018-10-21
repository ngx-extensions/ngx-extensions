import { NgModule } from '@angular/core';

import { NgxLet } from './let/let.directive';
import { NgxRepeat } from './repeat/repeat.directive';
import { NgxNestedValuePipe } from './nested-value/nested-value.pipe';

@NgModule({
  declarations: [NgxLet, NgxRepeat, NgxNestedValuePipe],
  exports: [NgxLet, NgxRepeat, NgxNestedValuePipe]
})
export class NgxCommonModule {}
