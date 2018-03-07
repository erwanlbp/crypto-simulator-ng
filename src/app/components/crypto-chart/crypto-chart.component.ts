import {Component, Input} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {PRICESProvider} from '../../providers/prices.provider';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.css']
})
export class CryptoChartComponent {
  private _coinSymbol: string;
  private _chart: Chart = new Chart();
  private _prices$: Observable<any>;
  private _prices: any;

  constructor(private _pricesProvider: PRICESProvider) {
  }

  @Input()
  set coinSymbol(symbol: string) {
    if (symbol) {
      this._coinSymbol = symbol;
    }
  }

  formatValues(values) {
    if (values) return values.map(value => Number(value));
  }

  ngOnInit() {
      this._pricesProvider.getValues$(this._coinSymbol)
        .subscribe(res => {
          this._prices = this.formatValues(res);

          console.log(this._prices)

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
              data: this._prices
            }]
          });
          // this._chart.addPoint()
        });

  }

  ngOnDestroy() {
    this._chart = null;
  }
}
