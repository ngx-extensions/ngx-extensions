import { Injectable, OnDestroy } from '@angular/core';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import * as screenfull from 'screenfull';

/**
 * Tracks the state of the fullscreen mode and allows interaction with its API
 */
@Injectable()
export class ScreenfullService implements OnDestroy {
  private readonly fullScreenSub = new Subject<boolean>();
  readonly fullScreenActive$: Observable<boolean>;

  /**
   * Gets whether browser fullscreen mode is active or not.
   */
  get isFullScreenModeActive(): boolean {
    return screenfull ? screenfull.isFullscreen : false;
  }

  /**
   * Creates a new instance
   */
  constructor() {
    this._registerListener();
    this.fullScreenActive$ = this.fullScreenSub.asObservable().pipe(
      startWith(this.isFullScreenModeActive),
      distinctUntilChanged()
    );
  }

  ngOnDestroy() {
    this._removeListener();
    this.fullScreenSub.complete();
  }

  /**
   * Toggles the fullscreen mode of the browser
   */
  toggle() {
    if (screenfull) {
      if (screenfull.enabled) {
        screenfull.toggle();
      }
    }
  }

  private _removeListener() {
    if (screenfull) {
      screenfull.off('change', () => {});
    }
  }

  private _registerListener() {
    if (screenfull) {
      screenfull.on('change', event => {
        this._emitCurrent();
      });
    }
  }

  private _emitCurrent() {
    this.fullScreenSub.next(this.isFullScreenModeActive);
  }
}
