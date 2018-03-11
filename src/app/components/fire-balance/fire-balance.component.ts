import {Component, Injectable, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {FireBalanceProvider} from '../../providers/fire-balance.provider';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-fire-balance',
  templateUrl: './fire-balance.component.html',
  styleUrls: ['./fire-balance.component.css']
})
@Injectable()
export class FireBalanceComponent implements OnInit, OnChanges {

  @Input() email: string;
  balances$: Observable<Balance[]>;

  constructor(private db: AngularFirestore,
              private balancesService: FireBalanceProvider) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.balances$ = this.balancesService.getBalances(this.email);
  }
}
