import {Injectable} from '@angular/core';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PRICESProvider {

  public static prices = {};

  constructor(private client: HttpClient) {
    IntervalObservable
      .create(2000)
      .subscribe(
        () => {
          this.client.get(`https://api.binance.com/api/v3/ticker/price?`)
            .subscribe(
              (coins: any[]) => coins.forEach((c: any) => {
                this.updatePrices(c.symbol, c.price);
              })
            );
        });
  }

  public updatePrices(coinSymbol, value) {
    if (!PRICESProvider.prices[coinSymbol]) {
      PRICESProvider.prices[coinSymbol] = [];
    }

    PRICESProvider.prices[coinSymbol] = [...PRICESProvider.prices[coinSymbol], value];
  }

}
