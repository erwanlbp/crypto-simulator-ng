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
  quantityBuy: number = 0;
  quantitySell: number = 0;
  symbol: string;
  symbolPrice: number = -1;
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
        const balanceArr = e.filter(bal => this.symbol.endsWith(bal.coin));
        if (balanceArr.length === 0) {
          return;
        }
        this.quantitySell = percent * balanceArr[0].balance;
        this.quantityBuy = this.quantitySell / this.symbolPrice;
      });
  }

  placeOrder() {
    this.updateSymbolPrice();
    const order: Order = {
      'symbol': this.symbol,
      'quantityBuy': this.quantitySell / this.symbolPrice,
      'quantitySell': this.quantitySell,
      'date': new Date()
    };
    this.db.collection(`/people/${this.email}/orders`).add(order);
    this.balancesProvider.changeBalance(this.email, order);
  }

  updateSymbolPrice() {
    this.pricesProvider.getLastPrice(this.symbol)
      .subscribe((e: any) => {
        this.symbolPrice = (e['price']) ? e.price : -1;
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
