import { NgModule } from '@angular/core';

import { ToggleFullscreenDirective } from './toggle-fullscreen.directive';
import { SCREEN_SERVICE_PROVIDER } from './screenfull-service.provider';

@NgModule({
  declarations: [ToggleFullscreenDirective],
  exports: [ToggleFullscreenDirective],
  providers: [SCREEN_SERVICE_PROVIDER]
})
export class NgxScreenfullModule {}
