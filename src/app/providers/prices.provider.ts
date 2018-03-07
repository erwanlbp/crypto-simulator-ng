import {Injectable} from '@angular/core';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PRICESProvider {

  constructor(private client: HttpClient) {
  }

  public getPrices(): Observable<any> {
    return IntervalObservable
      .create(2000)
      .flatMap(() => this.client.get(`https://api.binance.com/api/v3/ticker/price`));
  }

  public getPriceBySymbol(symbol: string) {
    return IntervalObservable
      .create(2000)
      .flatMap(() => this.client.get(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`));
  }
}
