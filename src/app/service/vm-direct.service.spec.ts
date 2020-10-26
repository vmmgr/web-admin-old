import { TestBed } from '@angular/core/testing';

import { VmDirectService } from './vm-direct.service';

describe('VmDirectService', () => {
  let service: VmDirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VmDirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
