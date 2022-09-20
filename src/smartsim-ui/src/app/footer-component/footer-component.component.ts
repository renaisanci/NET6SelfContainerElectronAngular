import { IpcService } from './../share/services/ipc.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ElectronIpcService } from '../share/services/electron-ipc.service';

@Component({
  selector: 'app-footer-component',
  templateUrl: './footer-component.component.html',
  styleUrls: ['./footer-component.component.css']
})
export class FooterComponentComponent implements OnInit {

  version: string = "0.0.0"

  constructor(private electronIpcService: ElectronIpcService, private cdRef: ChangeDetectorRef,
    private ipcService: IpcService
  ) { }

  ngOnInit() {
    //this.version = this.electronIpcService.getAppVersion();

    this.ipcService.send("app_version");
    this.ipcService.on("app_version", (event: any, arg: { version: string; }) => {
      this.version = arg.version;
      // in this case it is necessary since the communication between the ipc happens outside the “ NgZone
      //Causing the component not to be updated the component
      this.cdRef.detectChanges();
    });
  }
}
