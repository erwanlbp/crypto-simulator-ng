import {Component, EventEmitter, Output} from '@angular/core';
import {PRICESProvider} from '../../providers/prices.provider';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import {FireBalanceProvider} from '../../providers/fire-balance.provider';

@Component({
  selector: 'app-get-price',
  templateUrl: './choose-coin-symbol.component.html',
  styleUrls: ['./choose-coin-symbol.component.css']
})
export class ChooseCoinSymbolComponent {

  @Output() emitter: EventEmitter<any> = new EventEmitter<any>();
  coinSymbol: string;
  userEmail: string = 'erwan.lbp@gmail.com';

  constructor(private pricesProvider: PRICESProvider,
              private balancesProvider: FireBalanceProvider) {
  }

  public emitIt() {
    this.emitter.emit({'symbol': this.coinSymbol, 'userEmail': this.userEmail});
  }

  checkNewUser() {
    this.balancesProvider.checkNewUser(this.userEmail);
  }
}
