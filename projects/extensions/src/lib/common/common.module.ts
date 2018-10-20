import { NgModule } from '@angular/core';

import { NgxLet } from './let/let.directive';
import { NgxeRepeat } from './repeat/repeat.directive';
import { NgxNestedValuePipe } from './nested-value/nested-value.pipe';

@NgModule({
  declarations: [NgxLet, NgxeRepeat, NgxNestedValuePipe],
  exports: [NgxLet, NgxeRepeat, NgxNestedValuePipe]
})
export class NgxCommonModule {}
