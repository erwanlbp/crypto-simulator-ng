import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounce';
import * as _ from 'underscore';

@Injectable()
export class PRICESProvider {

  static prices = {};

  private _currentCoin = 'TRXETH';

  constructor(private client: HttpClient) {
  }

  get currentCoin() {
    return this._currentCoin;
  }

  set currentCoin(coin: string) {
    this._currentCoin = coin;
  }

  getPrices(timeToRefresh): Observable<any> {
    return IntervalObservable
      .create(timeToRefresh)
      .flatMap(() => this.client.get(`https://api.binance.com/api/v3/ticker/price`));
  }

  getLastPrice$(symbol, timeToRefresh): Observable<any> {
    return this.getPrices(timeToRefresh)
      .map(coins => _.find(coins, e => e.symbol === symbol));
  }

  getLastPrice(symbol): Observable<any> {
    return this.client.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
  }

  getPricesOnce(): Observable<any> {
    return this.client.get(`https://api.binance.com/api/v3/ticker/price`);
  }

  public getPricesBySymbolForChart(symbol: string): Observable<any> {
    return IntervalObservable
      .create(5000)
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
