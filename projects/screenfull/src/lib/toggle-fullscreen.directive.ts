import { Directive, HostListener } from '@angular/core';

import { ScreenfullService } from './screenfull.service';

/**
 * Binds a host element´s click to the {@see ScreenfullService} toggle method
 */
@Directive({
  selector: '[ngxToggleFullscreen]'
})
export class ToggleFullscreenDirective {
  /**
   * Creates a new instance
   * @param _screenfullService the screen service singletone instance
   */
  constructor(private readonly _screenfullService: ScreenfullService) {}

  /**
   * Toggles the fullscreen mode
   */
  @HostListener('click')
  toggle() {
    this._screenfullService.toggle();
  }
}
