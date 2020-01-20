import { Component, OnInit } from '@angular/core';
import { products } from '../data/products';

@Component({
  selector: 'app-searchable-product-table',
  templateUrl: './searchable-product-table.component.html',
  styleUrls: ['./searchable-product-table.component.css']
})
export class SearchableProductTableComponent implements OnInit {
  filteredProducts;
  searchText;
  showInstockOnly;
  constructor() { }

  ngOnInit() {
    this.searchText = '';
    this.showInstockOnly = false;
    this.filteredProducts = products;
  }

  onSearchChanged() {
    this.filteredProducts =
    products.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()) && (!this.showInstockOnly || p.instock > 0));
  }

  searchTextChange(event) {
    this.searchText = event;
    this.onSearchChanged();
  }

  checkboxChange(event) {
    this.showInstockOnly = event;
    this.onSearchChanged();
  }
}
