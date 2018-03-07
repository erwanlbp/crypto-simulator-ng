import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-fire-balance',
  templateUrl: './fire-balance.component.html',
  styleUrls: ['./fire-balance.component.css']
})
export class FireBalanceComponent implements OnInit {
  @Output() emitter = new EventEmitter();
  balances$: Observable<any[]>;
  @Input() email: string = 'erwan.lbp@gmail.com';

  constructor(private db: AngularFirestore) {
  }

  ngOnInit() {
    this.balances$ = this.db.collection(`/people/${this.email}/balances`).snapshotChanges().map(balances => {
      return balances.map(b => {
        const value = b.payload.doc.data();
        const name = b.payload.doc.id;
        return {name, ...value};
      });
    });
  }

  emit() {
    this.emitter.emit(this.balances$);
  }
}
