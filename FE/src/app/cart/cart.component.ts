import { ApiService } from './../api.service';
import { CartService } from './../cart.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../data/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: CartItem[] = [];
  constructor(
    private api: ApiService,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.getItems().forEach((value, key) => {
      this.items.push({
        id: key.id,
        name: key.name,
        quantity: value,
        price: key.price * value,
      } as CartItem);
    });
  }

  clearCart() {
    this.cartService.clearCart();
    this.items = [];
  }

  purchase() {
    const order: Order = { ids: [], quantity: []};
    this.items.forEach(value => {
      order.ids.push(value.id);
      order.quantity.push(value.quantity);
    });

    this.api.orderMobiles(order)
      .then(() => {
        alert('All products are purchased.');
        this.clearCart();
      })
      .catch(error => {
        alert(error);
      });
  }
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  ids: number[];
  quantity: number[];
}
