import {Injectable} from '@angular/core';

@Injectable()
export class PRICESProvider {

  public static prices = {};

  public updatePrices(value, coinSymbol) {
    PRICESProvider.prices[coinSymbol] = [...PRICESProvider.prices[coinSymbol], value];
  }

}
