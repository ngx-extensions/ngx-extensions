import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import screenfull from 'screenfull';

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

  request() {
    if (screenfull) {
      if (screenfull.enabled) {
        screenfull.request();
      }
    }
  }

  exit() {
    if (screenfull) {
      if (screenfull.enabled) {
        screenfull.exit();
      }
    }
  }

  /**
   * Toggles the fullscreen mode of the browser
   */
  toggle(el?: Element) {
    if (screenfull) {
      if (screenfull.enabled) {
        screenfull.toggle(el);
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
