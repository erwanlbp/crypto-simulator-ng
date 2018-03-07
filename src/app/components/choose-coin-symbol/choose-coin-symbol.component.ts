import {Component, EventEmitter, Output} from '@angular/core';
import {PRICESProvider} from '../../providers/prices.provider';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-get-price',
  templateUrl: './choose-coin-symbol.component.html',
  styleUrls: ['./choose-coin-symbol.component.css']
})
export class ChooseCoinSymbolComponent {

  @Output() coinSymbolEmitter: EventEmitter<string> = new EventEmitter<string>();
  coinSymbol: string;

  constructor(private pricesProvider: PRICESProvider) {
  }

  public emitCoinSymbol() {
    this.coinSymbolEmitter.emit(this.coinSymbol);
  }

}
