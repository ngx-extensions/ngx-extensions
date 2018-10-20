import {
  TestBed,
  async,
  inject,
  ComponentFixture
} from '@angular/core/testing';
import { ElementRef, ViewChild, Component } from '@angular/core';

import { ToggleFullscreenDirective } from './toggle-fullscreen.directive';
import { ScreenfullService } from './screenfull.service';
import { NgxScreenfullModule } from './screenfull.module';

@Component({
  template: `<span ngxToggleFullscreen #ref></span>`
})
export class TestComponent {
  @ViewChild('ref')
  elementRef: ElementRef<HTMLSpanElement>;

  @ViewChild(ToggleFullscreenDirective)
  dir: ToggleFullscreenDirective;

  clickDirectiveHost() {
    this.elementRef.nativeElement.click();
  }
}

describe('ToggleFullscreenDirective', () => {
  let hostFixture: ComponentFixture<TestComponent>;
  let hostComponent: TestComponent;
  const screenServiceMock = jasmine.createSpyObj('ScreenService', ['toggle']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxScreenfullModule],
      declarations: [TestComponent],
      providers: [
        {
          provide: ScreenfullService,
          useValue: screenServiceMock
        }
      ]
    });
  });

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
  });

  it('should correctly create an instance', async(
    inject([ScreenfullService], (screenService: ScreenfullService) => {
      const directive = new ToggleFullscreenDirective(screenService);
      expect(directive).toBeTruthy();
    })
  ));

  it('should call the directive toggle method, when the directive host is clicked', () => {
    const toggleSpy = spyOn(hostComponent.dir, 'toggle');

    hostComponent.clickDirectiveHost();

    expect(toggleSpy).toHaveBeenCalled();
  });

  it('should call the screenservice toggle method', async(
    inject([ScreenfullService], (screenService: ScreenfullService) => {
      const directive = new ToggleFullscreenDirective(screenService);

      directive.toggle();

      expect(screenService.toggle).toHaveBeenCalled();
    })
  ));
});
