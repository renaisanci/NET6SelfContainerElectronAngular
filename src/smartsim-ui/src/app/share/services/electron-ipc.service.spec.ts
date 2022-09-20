/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ElectronIpcService } from './electron-ipc.service';

describe('Service: ElectronIpc', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ElectronIpcService]
    });
  });

  it('should ...', inject([ElectronIpcService], (service: ElectronIpcService) => {
    expect(service).toBeTruthy();
  }));
});
