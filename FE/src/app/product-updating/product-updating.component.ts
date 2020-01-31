import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-updating',
  templateUrl: './product-updating.component.html',
  styleUrls: ['./product-updating.component.css']
})
export class ProductUpdatingComponent implements OnInit {
  productForm;
  constructor(
    private api: ApiService
  ) { }

  ngOnInit() {
    this.productForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      price: new FormControl(0),
      instock: new FormControl(0),
    });
  }

  onSubmit(data) {
    this.api.saveMobile({
      name: this.productForm.get('name'),
      description: this.productForm.get('name'),
      price: this.productForm.get('name'),
      instock: this.productForm.get('name'),
    });
  }

  processFile(imageInput) {

  }
}
