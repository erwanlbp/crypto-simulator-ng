import {Injectable} from '@angular/core';

@Injectable()
export class PRICESProvider {

  public static prices = {};

  public updatePrices(coinSymbol, value) {
    if (!PRICESProvider.prices[coinSymbol]) {
      PRICESProvider.prices[coinSymbol] = [];
    }

    PRICESProvider.prices[coinSymbol] = [...PRICESProvider.prices[coinSymbol], value];
  }

}
