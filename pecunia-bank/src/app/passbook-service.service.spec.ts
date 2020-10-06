import { TestBed } from '@angular/core/testing';

import { PassbookServiceService } from './passbook-service.service';

describe('PassbookServiceService', () => {
  let service: PassbookServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassbookServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
