import { CartService } from './../cart.service';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  title = 'Mobile Shop (Demo)';
  numberItems =  0;
  subcription: Subscription;

  constructor(
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit() {
    this.subcription = this.cartService.numberItems.subscribe(data => {
      this.numberItems = data;
    });
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToList(): void {
    this.router.navigate(['']);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy()	{
    this.subcription.unsubscribe();
  }

}
