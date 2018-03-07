import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PRICESProvider {

  public static prices = {};

  public updatePrices(coinSymbol, value) {
    if (!PRICESProvider.prices[coinSymbol]) {
      PRICESProvider.prices[coinSymbol] = [];
    }

    PRICESProvider.prices[coinSymbol] = [...PRICESProvider.prices[coinSymbol], value];

    console.log('test');
  }

  public getValues$(symbol: string): Observable<any> {
    return Observable.of(PRICESProvider.prices[symbol]);
  }
}
