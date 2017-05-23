import { TestBed, inject } from '@angular/core/testing';

import { CesarCypherService } from './cesar-cypher.service';

describe('CesarCypherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CesarCypherService]
    });
  });

  it('should be created', inject([CesarCypherService], (service: CesarCypherService) => {
    expect(service).toBeTruthy();
  }));
});
