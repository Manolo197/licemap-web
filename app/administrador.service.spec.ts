/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdministradorService } from './administrador.service';

describe('AdministradorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdministradorService]
    });
  });

  it('should ...', inject([AdministradorService], (service: AdministradorService) => {
    expect(service).toBeTruthy();
  }));
});
