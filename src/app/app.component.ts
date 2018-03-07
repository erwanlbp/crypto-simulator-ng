import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private _coinSymbol$: Observable<string>;

  emitCoinSymbol(symbol) {
    this._coinSymbol$ = symbol;
  }
}
