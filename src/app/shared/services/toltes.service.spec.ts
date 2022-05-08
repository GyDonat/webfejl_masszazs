import { TestBed } from '@angular/core/testing';

import { ToltesService } from './toltes.service';

describe('ToltesService', () => {
  let service: ToltesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToltesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
