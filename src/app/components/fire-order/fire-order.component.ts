import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-fire-order',
  templateUrl: './fire-order.component.html',
  styleUrls: ['./fire-order.component.css']
})
export class FireOrderComponent implements OnInit {
  price: number;
  quantity: number;

  constructor() {
  }

  ngOnInit() {
  }

  clicked(percent: number) {

  }

  placeOrder() {

  }
}
