import { TestBed } from '@angular/core/testing';

import { PatientsApi } from './patients.api';

describe('PatientsApi', () => {
  let service: PatientsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
