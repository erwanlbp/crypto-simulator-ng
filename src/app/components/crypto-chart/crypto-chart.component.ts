import {AfterViewInit, Component, Input} from '@angular/core';
import { Chart } from 'angular-highcharts';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.css']
})
export class CryptoChartComponent implements AfterViewInit {
  private _coinSymbol: string;
  private _chart: Chart = new Chart();

  constructor(/*private _pricesProvider: PRICESProvider*/) {}

  @Input()
  set coinSymbol(symbol: string) {
    this._coinSymbol = symbol;
  }

  addPoint() {
    // this._chart.addPoint();
  }

  ngOnInit() {

  }


  ngAfterViewInit() {
    this._chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Crypto Money'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: this._coinSymbol,
        data: [1, 2, 3]
      }]
    });
  }

  ngOnDestroy() {
    this._chart = null;
  }
}
