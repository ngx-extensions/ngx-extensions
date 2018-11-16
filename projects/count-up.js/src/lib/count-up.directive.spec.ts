import { ElementRef, Component, ViewChild, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { NgxCountUpDirective } from './count-up.directive';
import { NgxCountUpModule } from './count-up.module';

@Component({
  template: `
    <span
      ngxCountUp
      (animationCompleted)="completed()"
      (animationStarted)="started()"
      [duration]="duration"
      [reanimateOnClick]="reanimateOnClick"
      [endValue]="endValue"
      [startValue]="startValue"
      >
      0
      </span>`
})
export class NoOptionsTestComponent {
  duration = 2;
  endValue = 100;
  startValue = 15;
  reanimateOnClick = false;

  @ViewChild(NgxCountUpDirective)
  countUpDir: NgxCountUpDirective;

  started() {}

  completed() {}
}

describe(`${NgxCountUpDirective.name}`, () => {
  describe('without host component', () => {
    it('should correctly create', () => {
      const spyElementRef = jasmine.createSpyObj(ElementRef.name, {
        nativeElement: {}
      });

      const uut = new NgxCountUpDirective(spyElementRef);

      expect(uut).toBeTruthy();
    });
  });

  describe('with host component', () => {
    let fixture: ComponentFixture<NoOptionsTestComponent>;
    let hostComponent: NoOptionsTestComponent;
    let spanDebugElement: DebugElement;
    let spanElement: HTMLSpanElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NgxCountUpModule],
        declarations: [NoOptionsTestComponent]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NoOptionsTestComponent);
      hostComponent = fixture.componentInstance;
    });

    describe('host click', () => {
      let startSpy: jasmine.Spy;
      let completeSpy: jasmine.Spy;

      beforeEach(() => {
        startSpy = spyOn(hostComponent, 'started');
        completeSpy = spyOn(hostComponent, 'completed');
      });

      afterEach(() => {
        startSpy = null;
        completeSpy = null;
      });

      function resetAnimationSpies() {
        startSpy.calls.reset();
        completeSpy.calls.reset();
      }

      function expectAnimationSpiesToNotBeCalled() {
        expect(startSpy).not.toHaveBeenCalled();
        expect(completeSpy).not.toHaveBeenCalled();
      }

      function expectAnimationSpiesToBeCalledSuccessively() {
        expect(startSpy).toHaveBeenCalled();
        expect(startSpy).toHaveBeenCalledBefore(completeSpy);
        expect(completeSpy).toHaveBeenCalled();
      }

      it('should not retrigger the animation, when `reanimateOnClick` is false', fakeAsync(() => {
        hostComponent.reanimateOnClick = false;

        expectAnimationSpiesToNotBeCalled();
        detectQueringSpan();

        tickAnimationTime(hostComponent);
        expectAnimationSpiesToBeCalledSuccessively();

        resetAnimationSpies();
        spanElement.click();
        tick();
        fixture.detectChanges();
        expectAnimationSpiesToNotBeCalled();
      }));

      it('should retrigger the animation, when `reanimateOnClick` is true', fakeAsync(() => {
        hostComponent.reanimateOnClick = true;

        expectAnimationSpiesToNotBeCalled();

        detectQueringSpan();

        tickAnimationTime(hostComponent);
        expectAnimationSpiesToBeCalledSuccessively();

        resetAnimationSpies();
        spanElement.click();
        tickAnimationTime(hostComponent);
        fixture.detectChanges();
        expectAnimationSpiesToBeCalledSuccessively();
      }));
    });

    it('should emit `animationStarted` when the count-up animation starts', fakeAsync(() => {
      const spy = spyOn(hostComponent, 'started');

      expect(spy).not.toHaveBeenCalled();

      fixture.detectChanges();

      tick();
      expect(spy).toHaveBeenCalled();
    }));

    it('should emit `animationStarted` when `animate` is invoked', () => {
      const spy = spyOn(hostComponent, 'started');

      expect(spy).not.toHaveBeenCalled();

      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();

      spy.calls.reset();
      hostComponent.countUpDir.animate();
      expect(spy).toHaveBeenCalled();
    });

    it('should emit `animationCompleted` when the count-up animation is complete', fakeAsync(() => {
      const spy = spyOn(hostComponent, 'completed');

      expect(spy).not.toHaveBeenCalled();
      fixture.detectChanges();

      tickAnimationTime(hostComponent);
      expect(spy).toHaveBeenCalled();
    }));

    it('should emit `animationCompleted` when `animate` is invoked', fakeAsync(() => {
      const spy = spyOn(hostComponent, 'completed');

      expect(spy).not.toHaveBeenCalled();
      fixture.detectChanges();

      tickAnimationTime(hostComponent);
      expect(spy).toHaveBeenCalled();

      spy.calls.reset();
      hostComponent.countUpDir.animate();
      tickAnimationTime(hostComponent);
      expect(spy).toHaveBeenCalled();
    }));

    function detectQueringSpan(): HTMLSpanElement {
      fixture.detectChanges();

      spanDebugElement = fixture.debugElement.query(By.css('span'));
      spanElement = spanDebugElement.nativeElement;
      return spanElement;
    }
  });
});

function tickAnimationTime(hostComponent: NoOptionsTestComponent) {
  tick(hostComponent.countUpDir.duration * 1000);
}
