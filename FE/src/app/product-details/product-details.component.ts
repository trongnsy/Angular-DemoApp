import { CartService } from './../cart.service';
import { IProduct } from '../data/product';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { products } from '../data/products';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  outOfStock: boolean;
  product: IProduct;
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.product = products[+params.get('productId')];
      this.outOfStock = this.product.instock === 0;
    });
  }

  addToCart(): void {
    if (this.outOfStock) {
      alert('This product is temporarily out of stock!');
    } else {
      this.cartService.addToCart(this.product);
    }
  }
}
