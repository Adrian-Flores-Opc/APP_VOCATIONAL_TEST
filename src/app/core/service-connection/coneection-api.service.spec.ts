import { TestBed } from '@angular/core/testing';

import { ConeectionApiService } from './coneection-api.service';

describe('ConeectionApiService', () => {
  let service: ConeectionApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConeectionApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
