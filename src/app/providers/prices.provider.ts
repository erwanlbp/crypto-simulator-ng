import {Injectable} from '@angular/core';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/debounce';

@Injectable()
export class PRICESProvider {

  constructor(private client: HttpClient) {
  }

  getPrices(): Observable<any> {
    return IntervalObservable
      .create(2000)
      .flatMap(() => this.client.get(`https://api.binance.com/api/v3/ticker/price`));
  }

  getLastPrice(symbol): Observable<any> {
    return this.client.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
  }

  getPricesOnce(): Observable<any> {
    return this.client.get(`https://api.binance.com/api/v3/ticker/price`)
      .take(1);
  }
}
