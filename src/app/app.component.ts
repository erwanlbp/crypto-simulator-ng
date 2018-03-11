import {Component, OnInit} from '@angular/core';
import {PRICESProvider} from './providers/prices.provider';
import * as _ from 'underscore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  favoriteCoins = {'LTCETH': 0, 'TRXETH': 0, 'QSPETH': 0};
  favoritePrices = {'LTCETH': 0, 'TRXETH': 0, 'QSPETH': 0};
  favoriteVariations = {'LTCETH': '=', 'TRXETH': '=', 'QSPETH': '='};
  private _coinSymbol: string;
  private _userEmail: string;

  constructor(private _pricesProvider: PRICESProvider) {
  }

  emitSymbol(event) {
    this._coinSymbol = event.symbol;
    this._userEmail = event.userEmail;
  }

  ngOnInit(): void {
    this._coinSymbol = this._pricesProvider.currentCoin;
    this.getFavoritePrices();
  }

  public getFavoritePrices() {
    _.each(this.favoriteCoins, (value: number, symbol: string) => {
      this.favoriteCoins[symbol] = this._pricesProvider.getLastPrice$(symbol, 1000);
      this.favoritePrices[symbol] = this._pricesProvider.getLastPrice$(symbol, 2000);
      this.favoriteVariations[symbol] =
        Observable.combineLatest(
          this.favoriteCoins[symbol],
          this.favoritePrices[symbol],
          (priceEvery1s: any, priceEvery5s: any) => {
            return priceEvery5s.price > priceEvery1s.price ? '↗' : '↘';
          });
    });
  }

}
