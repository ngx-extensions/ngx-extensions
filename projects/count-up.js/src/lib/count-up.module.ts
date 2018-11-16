import { NgModule } from '@angular/core';

import { NgxCountUpDirective } from './count-up.directive';

@NgModule({
  declarations: [NgxCountUpDirective],
  exports: [NgxCountUpDirective]
})
export class NgxCountUpModule {}
