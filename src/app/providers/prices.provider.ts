import {Injectable} from '@angular/core';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import * as _ from 'underscore';

@Injectable()
export class PRICESProvider {

  static prices = {};

  constructor(private client: HttpClient) {
  }

  public getPricesBySymbolForChart(symbol: string): Observable<any> {
    return IntervalObservable
      .create(2000)
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
