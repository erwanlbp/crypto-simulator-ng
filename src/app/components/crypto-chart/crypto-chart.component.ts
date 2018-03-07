import {Component, Input} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {PRICESProvider} from '../../providers/prices.provider';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-crypto-chart',
  templateUrl: './crypto-chart.component.html',
  styleUrls: ['./crypto-chart.component.css']
})
export class CryptoChartComponent {
  private _coinSymbol: string;
  private _chart: Chart = new Chart();
  private _prices: any;

  private _sub: Subscription;

  constructor(private _pricesProvider: PRICESProvider) {}

  @Input()
  set coinSymbol(symbol: string) {
    if (symbol) {
      this._coinSymbol = symbol;

      this.initChart();

      if (this._sub) this._sub.unsubscribe();

      this._sub = this._pricesProvider.getPricesBySymbolForChart(this._coinSymbol)
        .subscribe(res => {
          this._prices = this.formatValues(res);

          this._chart.removeSerie(0);

          this._chart.addSerie({
            name: this._coinSymbol,
            data: this._prices
          });
        });
    }
  }

  formatValues(values) {
    if (values) return values.map(value => Number(value));
  }

  initChart() {
    this._chart = new Chart({
      chart: {
        type: 'line'
      },
      title: {
        text: 'Crypto Simulator'
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Values in coming',
        data: []
      }]
    });

  }

  ngOnDestroy() {
    this._chart = null;
  }
}
