import { IProduct } from './data/product';
import { Shipping } from './data/shipping';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Map<IProduct, number> = new Map<IProduct, number>();
  count = 0;
  numberItems: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient
  ) { }

  addToCart(product: IProduct): void {
    if (this.items.has(product)) {
      let value = this.items.get(product);
      this.items.set(product, ++value);
    } else {
      this.items.set(product, 1);
    }

    this.numberItems.next(++this.count);
  }

  getItems(): Map<IProduct, number> {
    return this.items;
  }

  clearCart() {
    this.items.clear();
    this.count = 0;
    this.numberItems.next(this.count);
  }

  getShippingPrices(): Shipping[] {
    let shippings: Shipping[];
    this.http.get('/assets/shipping.json').subscribe(items => {
      shippings = items as Shipping[];
    });

    return shippings;
  }
}
