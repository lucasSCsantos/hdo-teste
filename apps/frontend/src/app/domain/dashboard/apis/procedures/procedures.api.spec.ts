import { TestBed } from '@angular/core/testing';

import { ProceduresApi } from './procedures.api';

describe('ProceduresApi', () => {
  let service: ProceduresApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProceduresApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
