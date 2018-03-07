import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IntervalObservable} from 'rxjs/observable/IntervalObservable';
import {Observable} from 'rxjs/Observable';
import {PRICESProvider} from '../../providers/prices.provider';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-get-price',
  templateUrl: './get-price.component.html',
  styleUrls: ['./get-price.component.css']
})
export class GetPriceComponent implements OnInit, OnDestroy {

  @Output() coinSymbolEmitter: EventEmitter<Observable<string>> = new EventEmitter<Observable<string>>();
  coinSymbol$: Observable<string>;
  requetPrices: Subscription;

  constructor(private client: HttpClient, private pricesProvider: PRICESProvider) {
  }

  ngOnInit() {
    this.getPrices();
  }

  public getPrices() {
    IntervalObservable
      .create(1000)
      .subscribe(
        () => {
          this.requetPrices = this.client.get(`https://api.binance.com//api/v3/ticker/price?`)
            .subscribe(
              (coins: any[]) => coins.forEach((c: any) => {
                this.pricesProvider.updatePrices(c.symbol, c.price);
              })
            );
        });
  }

  public emitCoinSymbol() {
    this.coinSymbolEmitter.emit(this.coinSymbol$);
  }

  ngOnDestroy() {
    this.requetPrices.unsubscribe();
  }
}
