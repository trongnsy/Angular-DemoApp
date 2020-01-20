import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  title = 'searchable-product-table';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }

  goToList(): void {
    this.router.navigate(['']);
  }
}
