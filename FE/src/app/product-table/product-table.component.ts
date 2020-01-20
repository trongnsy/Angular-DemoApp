import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent implements OnInit {
  @Input() products;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  goToDetails(id: number) {
    this.router.navigate(['/product', id]);
  }
}
