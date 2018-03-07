import {AfterViewInit, Component, Input} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.css']
})
export class CryptoChartComponent implements AfterViewInit {
  private _coinSymbol: string;
  private _chart: Chart = new Chart();
  private _prices$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private _prices: any;

  constructor() {}

  @Input()
  set coinSymbol(symbol: string) {
    this._coinSymbol = symbol;
  }

  addPoint() {
    // this._chart.addPoint();
  }

  ngOnInit() {
    this._prices$.next(this._prices);
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
        data: this._prices$.getValue()
      }]
    })
  }

  ngOnDestroy() {
    this._chart = null;
  }
}
