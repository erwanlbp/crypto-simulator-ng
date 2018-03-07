import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounce';

@Injectable()
export class PRICESProvider {

  static prices = {};

  constructor(private client: HttpClient) {
  }

  getPrices(): Observable<any> {
    return IntervalObservable
      .create(1000)
      .flatMap(() => this.client.get(`https://api.binance.com/api/v3/ticker/price`));
  }

  getLastPrice(symbol): Observable<any> {
    return this.client.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
  }

  getPricesOnce(): Observable<any> {
    return this.client.get(`https://api.binance.com/api/v3/ticker/price`);
  }

  public getPricesBySymbolForChart(symbol: string): Observable<any> {
    return IntervalObservable
      .create(10000)
      .flatMap(() => this.client.get(`https://api.binance.com/api/v3/ticker/price`))
      .map((coins: any) => {
        coins.forEach((coin: any) => {
          if (!PRICESProvider.prices[coin.symbol]) {
            PRICESProvider.prices[coin.symbol] = [];
          }

          PRICESProvider.prices[coin.symbol] = [...PRICESProvider.prices[coin.symbol], coin.price];

          PRICESProvider.prices[coin.symbol] = _.uniq(PRICESProvider.prices[coin.symbol]);
        });

        return PRICESProvider.prices[symbol];
      });
  }
}
