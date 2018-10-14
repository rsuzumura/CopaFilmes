import { TestBed } from '@angular/core/testing';

import { TorneioService } from './torneio.service';

describe('TorneioService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TorneioService = TestBed.get(TorneioService);
    expect(service).toBeTruthy();
  });
});
