import { TestBed, inject } from '@angular/core/testing';

import { VigenereCypherService } from './vigenere-cypher.service';

describe('VigenereCypherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VigenereCypherService]
    });
  });

  it('should be created', inject([VigenereCypherService], (service: VigenereCypherService) => {
    expect(service).toBeTruthy();
  }));
});
