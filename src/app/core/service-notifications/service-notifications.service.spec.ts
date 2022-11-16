import { TestBed } from '@angular/core/testing';

import { ServiceNotificationsService } from './service-notifications.service';

describe('ServiceNotificationsService', () => {
  let service: ServiceNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
