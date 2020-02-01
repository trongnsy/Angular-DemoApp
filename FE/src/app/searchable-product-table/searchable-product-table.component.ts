import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { IProduct } from '../data/product';

@Component({
  selector: 'app-searchable-product-table',
  templateUrl: './searchable-product-table.component.html',
  styleUrls: ['./searchable-product-table.component.css']
})
export class SearchableProductTableComponent implements OnInit {
  products: IProduct[] = [];
  filteredProducts: IProduct[] = [];
  searchText: string;
  showInstockOnly: boolean;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.searchText = '';
    this.showInstockOnly = false;

    this.api.getMobiles().then(data => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  onSearchChanged() {
    this.filteredProducts =
      this.products.filter(p => p.name.toLowerCase().includes(this.searchText.toLowerCase()) && (!this.showInstockOnly || p.instock > 0));
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
