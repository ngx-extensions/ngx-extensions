import { FactoryProvider, Optional, SkipSelf } from '@angular/core';

import { ScreenfullService } from './screenfull.service';

export function SCREEN_SERVICE_FACTORY(
  parent: ScreenfullService
): ScreenfullService {
  return parent || new ScreenfullService();
}

export const SCREEN_SERVICE_PROVIDER: FactoryProvider = {
  provide: ScreenfullService,
  deps: [[new Optional(), new SkipSelf(), ScreenfullService]],
  useFactory: SCREEN_SERVICE_FACTORY
};
