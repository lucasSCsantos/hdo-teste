import { TestBed } from '@angular/core/testing';

import { AuditApi } from './audit.api';

describe('AuditApi', () => {
  let service: AuditApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
