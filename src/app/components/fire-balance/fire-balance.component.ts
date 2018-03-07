import {Component, Injectable, Input, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import {FireBalanceProvider} from '../../providers/fire-balance.provider';

@Component({
  selector: 'app-fire-balance',
  templateUrl: './fire-balance.component.html',
  styleUrls: ['./fire-balance.component.css']
})
@Injectable()
export class FireBalanceComponent implements OnInit {
  @Input() email: string = 'erwan.lbp@gmail.com';
  balances$: Observable<Balance[]>;

  constructor(private db: AngularFirestore, private balancesService: FireBalanceProvider) {
  }

  ngOnInit() {
    this.balances$ = this.balancesService.getBalances(this.email);
  }
}
