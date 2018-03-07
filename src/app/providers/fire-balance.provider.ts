import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FireBalanceProvider {

  constructor(private db: AngularFirestore) {
  }

  getBalances(email: string): Observable<Balance[]> {
    return this.db.collection(`/people/${email}/balances`).snapshotChanges().map(balances => {
      return balances.map(b => {
        const value = b.payload.doc.data();
        const coin = b.payload.doc.id;
        return {'coin': coin, 'balance': value.balance};
      });
    });
  }

  changeBalance(email: string, order: Order) {

    console.log(order.symbol);

    this.getBalances(email)
      .subscribe((e: Balance[]) => {
        const coins = {};
        const quantitiesBefore = {};
        e.forEach(bal => {
          if (order.symbol.startsWith(bal.coin)) {
            quantitiesBefore['buy'] = bal.balance;
            coins['buy'] = bal.coin;
          }
          if (order.symbol.endsWith(bal.coin)) {
            coins['sell'] = bal.coin;
            quantitiesBefore['sell'] = bal.balance;
          }
        });
        if (Object.keys(quantitiesBefore).length !== 2 || Object.keys(coins).length !== 2) {
          console.log('Failed gather quantities');
          return;
        }
        this.db.doc(`/people/${email}/balances/${coins['buy']}`).set({'balance': quantitiesBefore['buy'] + order.quantityBuy});
        this.db.doc(`/people/${email}/balances/${coins['sell']}`).set({'balance': quantitiesBefore['sell'] + order.quantitySell});
      });
  }
}
