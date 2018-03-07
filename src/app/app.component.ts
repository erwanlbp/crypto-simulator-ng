import {Component, OnInit} from '@angular/core';
import {PRICESProvider} from './providers/prices.provider';
import * as _ from 'underscore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  favoriteCoins = {'LTCETH': 0, 'TRXETH': 0, 'QSPETH': 0};
  private _coinSymbol: string;

  constructor(private _pricesProvider: PRICESProvider) {
  }

  emitSymbol(event) {
    this._coinSymbol = event;
  }

  ngOnInit(): void {
    this._coinSymbol = this._pricesProvider.currentCoin;
    this.getFavoritePrices();
  }

  public getFavoritePrices() {
    _.each(this.favoriteCoins, (value: number, symbol: string) => {
      this.favoriteCoins[symbol] = this._pricesProvider.getLastPrice$(symbol);
    });
  }
}
