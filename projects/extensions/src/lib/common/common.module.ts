import { NgModule } from '@angular/core';

import { NgxLet } from './let/let.directive';
import { NgxRepeat } from './repeat/repeat.directive';
import { NgxNestedValuePipe } from './nested-value/nested-value.pipe';
import { NgxReplacePipe } from './replace/replace.pipe';

@NgModule({
  declarations: [NgxLet, NgxRepeat, NgxNestedValuePipe, NgxReplacePipe],
  exports: [NgxLet, NgxRepeat, NgxNestedValuePipe, NgxReplacePipe]
})
export class NgxCommonModule {}
