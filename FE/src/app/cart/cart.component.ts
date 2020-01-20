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
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.cartService.getItems().forEach((value, key) => {
      this.items.push({
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
    alert('All products are purchased.');
    this.items = [];
  }
}

interface CartItem {
  name: string;
  price: number;
  quantity: number;
}
