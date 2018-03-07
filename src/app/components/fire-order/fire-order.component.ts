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
  quantityCoin: number = 0;
  quantityCoinFrom: number = 0;
  symbol: string;
  symbolPrice: number = -1;
  email: string = 'erwan.lbp@gmail.com';

  constructor(private db: AngularFirestore,
              private balances$: FireBalanceProvider,
              private pricesProvider: PRICESProvider) {
  }

  ngOnInit() {
  }

  clicked(percent: number) {
    if (this.symbol.length === 0) {
      return;
    }

    this.balances$.getBalances(this.email)
      .subscribe((e: Balance[]) => {
        const balanceArr = e.filter(bal => this.symbol.endsWith(bal.coin));
        if (balanceArr.length === 0) {
          return;
        }
        this.quantityCoinFrom = percent * balanceArr[0].balance;
        this.quantityCoin = this.quantityCoinFrom / this.symbolPrice;
      });
  }

  placeOrder() {

  }

  priceOfSymbol() {
    this.pricesProvider.getLastPrice(this.symbol)
      .subscribe((e: any) => {
        console.log(e);
        if (e['price']) {
          this.symbolPrice = e.price;
        }
      });
  }

  splitSymbol() {
    if (this.symbol.length === 0) {
      return;
    }

    this.balances$.getBalances(this.email)
      .subscribe((e: Balance[]) => {
        const balanceArr = e.filter(bal => this.symbol.endsWith(bal.coin));
        if (balanceArr.length !== 0) {
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
    this.priceOfSymbol();
  }
}
