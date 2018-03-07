import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {PRICESProvider} from './providers/prices.provider';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  favoritePrices$: {};

  constructor(private pricesProvider: PRICESProvider) {
  }

  ngOnInit(): void {
    this.getFavoritePrices();
  }

  public getFavoritePrices() {
  }

}
