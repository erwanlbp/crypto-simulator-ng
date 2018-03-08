import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FireBalanceProvider} from '../../providers/fire-balance.provider';
import {PRICESProvider} from '../../providers/prices.provider';

@Component({
  selector: 'app-fire-order',
  templateUrl: './fire-order.component.html',
  styleUrls: ['./fire-order.component.css']
})
export class FireOrderComponent implements OnInit {
  coin: string;
  coinFrom: string;
  quantityCoinBuy: number = 0;
  quantityCoinSell: number = 0;
  quantityCoinFromBuy: number = 0;
  quantityCoinFromSell: number = 0;
  symbol: string;
  symbolPrice: number = null;
  email: string = 'erwan.lbp@gmail.com';

  constructor(private db: AngularFirestore,
              private balancesProvider: FireBalanceProvider,
              private pricesProvider: PRICESProvider) {
  }

  ngOnInit() {
  }

  clicked(percent: number) {
    if (this.symbol.length === 0) {
      return;
    }

    this.balancesProvider.getBalances(this.email)
      .subscribe((e: Balance[]) => {
        const coins = {};
        this.quantityCoinFromBuy = 0;
        this.quantityCoinFromSell = 0;
        this.quantityCoinBuy = 0;
        this.quantityCoinSell = 0;
        e.forEach(bal => {
          if (this.symbol.endsWith(bal.coin)) {
            this.quantityCoinFromBuy = percent * bal.balance;
            this.quantityCoinBuy = this.quantityCoinFromBuy / this.symbolPrice;
          }
          if (this.symbol.startsWith(bal.coin)) {
            this.quantityCoinSell = percent * bal.balance;
            this.quantityCoinFromSell = this.quantityCoinSell * this.symbolPrice;
          }
        });
      });
  }

  placeOrder(side: string) {
    this.updateSymbolPrice();

    if (side !== 'buy' && side !== 'sell') {
      return;
    }

    const order: Order = {
      'symbol': this.symbol,
      'side': side,
      'quantityBuy': 0,
      'quantitySell': 0,
      'date': new Date()
    };

    switch (side) {
      case 'buy':
        order.quantityBuy = this.quantityCoinBuy;
        order.quantitySell = this.quantityCoinFromBuy;
        break;
      case 'sell':
        order.quantitySell = this.quantityCoinSell;
        order.quantityBuy = this.quantityCoinFromSell;
        break;
    }

    this.db.collection(`/people/${this.email}/orders`).add(order);
    this.balancesProvider.changeBalance(this.email, order);
  }

  updateSymbolPrice() {
    this.pricesProvider.getLastPrice(this.symbol)
      .subscribe((e: any) => {
        this.symbolPrice = (e['price']) ? e.price : null;
      });
  }

  splitSymbol() {
    if (this.symbol.length === 0) {
      return;
    }

    this.balancesProvider.getBalances(this.email)
      .subscribe((e: Balance[]) => {
        const balanceArr = e.filter(bal => this.symbol.endsWith(bal.coin));
        if (balanceArr && balanceArr.length !== 0) {
          this.coinFrom = balanceArr[0].coin;
          this.coin = this.symbol.split(this.coinFrom)[0];
        } else {
          this.coinFrom = '';
          this.coin = '';
        }
      });
  }

  symbolChanged() {
    this.splitSymbol();
    this.updateSymbolPrice();
  }
}
