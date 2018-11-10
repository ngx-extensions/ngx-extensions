import { TestBed } from '@angular/core/testing';

import { NgxScreenfullModule } from './screenfull.module';
import { ScreenfullService } from './screenfull.service';

describe('NgxScreenfullModule', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxScreenfullModule]
    });
  });

  it('should correctly be instanciated', () => {
    const uut = new NgxScreenfullModule();

    expect(uut).toBeTruthy();
  });

  it('should resolve the same instance of `ScreenfullService`', () => {
    const service1 = TestBed.get(ScreenfullService);
    const service2 = TestBed.get(ScreenfullService);

    expect(service1).toBe(service2);
  });
});
