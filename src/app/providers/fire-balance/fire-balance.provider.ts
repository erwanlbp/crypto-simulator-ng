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

}
