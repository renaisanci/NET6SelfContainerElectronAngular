import { Injectable } from '@angular/core';
//const { ipcRenderer } = (<any>window).require('electron');

@Injectable({
  providedIn: 'root'
})
export class ElectronIpcService {

  constructor() { }

  getAppVersion(): string {
    var version = ""
    // ipcRenderer.send('app_version');
    // ipcRenderer.on('app_version', (event: any, arg: { version: string; }) => {
    //   ipcRenderer.removeAllListeners('app_version');
    //   console.log('Version >>>>>> ' + arg.version)

    //   version = arg.version;
    // });
    return version;
  }
}
