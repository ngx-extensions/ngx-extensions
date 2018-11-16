import { ElementRef, Component, ViewChild } from '@angular/core';
import {
  TestBed,
  ComponentFixture,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { NgxCountUpDirective } from './count-up.directive';
import { NgxCountUpModule } from './count-up.module';

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
    // let spanDebugElement: DebugElement;
    // let spanElement: HTMLSpanElement;

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

      tick(hostComponent.countUpDir.duration * 1000);
      expect(spy).toHaveBeenCalled();
    }));

    it('should emit `animationCompleted` when `animate` is invoked', fakeAsync(() => {
      const spy = spyOn(hostComponent, 'completed');

      expect(spy).not.toHaveBeenCalled();
      fixture.detectChanges();

      tick(hostComponent.countUpDir.duration * 1000);
      expect(spy).toHaveBeenCalled();

      spy.calls.reset();
      hostComponent.countUpDir.animate();
      tick(hostComponent.countUpDir.duration * 1000);
      expect(spy).toHaveBeenCalled();
    }));

    // function detectQueringSpan(): HTMLSpanElement {
    //   fixture.detectChanges();

    //   spanDebugElement = fixture.debugElement.query(By.css('span'));
    //   spanElement = spanDebugElement.nativeElement;
    //   return spanElement;
    // }
  });
});

@Component({
  template: `
    <span
      ngxCountUp
      (animationCompleted)="completed()"
      (animationStarted)="started()"
      [duration]="duration"
      [reanimateOnClick]="animateOnClick"
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
  animateOnClick = false;

  @ViewChild(NgxCountUpDirective)
  countUpDir: NgxCountUpDirective;

  started() {}

  completed() {}
}
