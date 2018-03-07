import {Component, OnInit} from '@angular/core';
import {PRICESProvider} from './providers/prices.provider';
import * as _ from 'underscore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  favoriteCoins = {'LTCETH': 0, 'TRXETH': 0, 'QSPETH': 0};
  favoriteCoinsValues = {};

  constructor(private pricesProvider: PRICESProvider) {
  }

  ngOnInit(): void {
    this.getFavoritePrices();
  }

  public getFavoritePrices() {
    _.each(this.favoriteCoins, (value: number, symbol: string) => {
      this.favoriteCoins[symbol] = Observable.of(0); // this.pricesProvider.getValues$(symbol);
    });
  }

}
