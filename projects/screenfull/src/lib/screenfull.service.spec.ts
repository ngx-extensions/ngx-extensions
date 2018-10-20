import { TestBed, inject } from '@angular/core/testing';

import { ScreenfullService } from './screenfull.service';

describe('ScreenService', () => {
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
});
