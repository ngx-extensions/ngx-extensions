import { TestBed, inject } from '@angular/core/testing';
import screenfull from 'screenfull';

import { ScreenfullService } from './screenfull.service';

describe('ScreenService', () => {
  const screenfullObject = screenfull && screenfull;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScreenfullService]
    });
  });

  it('should be created', inject(
    [ScreenfullService],
    (service: ScreenfullService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should enter fullscreen mode', () => {
    const screenModeSpy = spyOnProperty(screenfullObject, 'isFullscreen');
    const requestSpy = spyOn(screenfullObject, 'request').and.callFake(() =>
      screenModeSpy.and.returnValue(true)
    );
    const uut = createUnitUnderTest();

    uut.request();

    expect(requestSpy).toHaveBeenCalled();
    expect(uut.isFullScreenModeActive).toBeTruthy();
  });

  it('should exit fullscreen mode', () => {
    const exitSpy = spyOn(screenfullObject, 'exit');
    const uut = createUnitUnderTest();

    uut.exit();

    expect(exitSpy).toHaveBeenCalled();
    expect(uut.isFullScreenModeActive).toBeFalsy();
  });

  function createUnitUnderTest() {
    return new ScreenfullService();
  }
});
