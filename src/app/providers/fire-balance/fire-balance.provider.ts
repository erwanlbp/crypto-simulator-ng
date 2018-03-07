import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FireBalanceProvider {

  constructor(private db: AngularFirestore) {
  }

  getBalances(email: string): Observable<any[]> {
    return this.db.collection(`/people/${email}/balances`).snapshotChanges().map(balances => {
      return balances.map(b => {
        const value = b.payload.doc.data();
        const name = b.payload.doc.id;
        return {name, ...value};
      });
    });
  }

}
