import { CartService } from './../cart.service';
import { Component, OnInit, Input } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Router } from '@angular/router';
import { IProduct } from '../data/product';

@Component({
  selector: 'app-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.css'],
  animations: [
    trigger('myAnimation', [
      state('normal', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(1.02)',
      })),

      transition('small => normal', animate('300ms ease-in')),
    ]),
  ]
})
export class ProductRowComponent implements OnInit {
  @Input() product;
  state = 'normal';

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }

  addToCart(product: IProduct) {
    this.cartService.addToCart(product);
  }

  animateRow($event) {
    this.state = ($event.type === 'mouseover' ? 'large' : 'normal');
  }

}
