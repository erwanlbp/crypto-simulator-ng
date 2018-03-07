import {inject, TestBed} from '@angular/core/testing';

import {FireBalanceProvider} from './fire-balance.provider';

describe('FireBalanceProvider', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FireBalanceProvider]
    });
  });

  it('should be created', inject([FireBalanceProvider], (service: FireBalanceProvider) => {
    expect(service).toBeTruthy();
  }));
});
