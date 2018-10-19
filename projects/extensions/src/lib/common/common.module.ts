import { NgModule } from '@angular/core';

import { NgxLetModule, NgxRepeatModule } from './directives';
import { NgxNestedValueModule } from './pipes';

@NgModule({
  exports: [NgxLetModule, NgxRepeatModule, NgxNestedValueModule]
})
export class NgxCommonModule {}
