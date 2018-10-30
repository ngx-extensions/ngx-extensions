import { NgModule } from '@angular/core';

import { NgxConnectQueryParam } from './connect-query-param/connect-query-param.directive';
import { NgxConnectRouteParam } from './connect-route-param/connect-route-param.directive';

@NgModule({
  declarations: [NgxConnectQueryParam, NgxConnectRouteParam],
  exports: [NgxConnectQueryParam, NgxConnectRouteParam]
})
export class NgxFormsModule {}
