import screenfull from 'screenfull';

import { ScreenfullService } from './screenfull.service';

describe('ScreenService', () => {
  const screenfullObject = screenfull && screenfull;

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

  it('should read the state of the screen mode and install a listener on service instance creation', () => {
    const fullScreenSpy = spyOnProperty(screenfullObject, 'isFullscreen');
    const onSpy = spyOn(screenfullObject, 'on');

    createUnitUnderTest();

    expect(onSpy).toHaveBeenCalledWith('change', jasmine.any(Function));
    expect(fullScreenSpy).toHaveBeenCalledTimes(1);
  });

  it('should correctly uninstall an event listered on "ngOnDestroy"', () => {
    const offSpy = spyOn(screenfullObject, 'off');

    const uut = createUnitUnderTest();
    uut.ngOnDestroy();

    expect(offSpy).toHaveBeenCalledWith('change', jasmine.any(Function));
  });

  it('should correctly toggle the fullscreenmode', () => {
    const toggleSpy = spyOn(screenfullObject, 'toggle');

    const uut = createUnitUnderTest();
    uut.toggle();

    expect(toggleSpy).toHaveBeenCalled();
  });

  function createUnitUnderTest() {
    return new ScreenfullService();
  }
});
