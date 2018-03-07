import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FireBalanceProvider} from '../../providers/fire-balance.provider';

@Component({
  selector: 'app-fire-order',
  templateUrl: './fire-order.component.html',
  styleUrls: ['./fire-order.component.css']
})
export class FireOrderComponent implements OnInit {
  quantity: number = 0;
  symbol: string;
  email: string = 'erwan.lbp@gmail.com';

  constructor(private db: AngularFirestore, private balances$: FireBalanceProvider) {
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
        this.quantity = percent * balanceArr[0].balance;
      });
  }

  placeOrder() {

  }
}
