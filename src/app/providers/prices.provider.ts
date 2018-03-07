import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/take';
import * as _ from 'underscore';

@Injectable()
export class PRICESProvider {

  constructor(private client: HttpClient) {
  }

  getPrices(): Observable<any> {
    return IntervalObservable
      .create(1000)
      .flatMap(() => this.client.get(`https://api.binance.com/api/v3/ticker/price`));
  }

  getLastPrice$(symbol): Observable<any> {
    return this.getPrices()
      .map(coins => _.find(coins, e => e.symbol === symbol))
      .take(1);
  }
}
