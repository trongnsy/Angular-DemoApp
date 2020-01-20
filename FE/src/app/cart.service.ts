import { IProduct } from './data/product';
import { Shipping } from './data/shipping';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  count = 0;
  items: Map<IProduct, number> = new Map<IProduct, number>();

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

    this.count++;
  }

  getCount(): number {
    return this.count;
  }

  getItems(): Map<IProduct, number> {
    return this.items;
  }

  clearCart() {
    this.items.clear();
    this.count = 0;
  }

  getShippingPrices(): Shipping[] {
    let shippings: Shipping[];
    this.http.get('/assets/shipping.json').subscribe(items => {
      shippings = items as Shipping[];
    });

    return shippings;
  }
}
