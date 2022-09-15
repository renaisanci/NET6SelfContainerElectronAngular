import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  public forecasts: Instrument[] = [];

  constructor(http: HttpClient) {
    http.get<Instrument[]>(`http://localhost:5000/Instruments`).subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));
  }
}

interface Instrument {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
  number : string;
  instrument: string;
  astm: string;
  hl7: string;
  cobas: string;
  poct1: string;
  winMonitor: string;
}
