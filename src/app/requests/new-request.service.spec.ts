import { TestBed, inject } from '@angular/core/testing';

import { NewRequestService } from './new-request.service';

describe('NewRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewRequestService]
    });
  });

  it('should be created', inject([NewRequestService], (service: NewRequestService) => {
    expect(service).toBeTruthy();
  }));
});
