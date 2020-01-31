import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { ApiService } from './api.service';
import { CartService } from './cart.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ProductTableComponent } from './product-table/product-table.component';
import { SearchableProductTableComponent } from './searchable-product-table/searchable-product-table.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { CartComponent } from './cart/cart.component';
import { ProductUpdatingComponent } from './product-updating/product-updating.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductRowComponent } from './product-row/product-row.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    ProductTableComponent,
    SearchableProductTableComponent,
    ProductDetailsComponent,
    TopBarComponent,
    CartComponent,
    ProductUpdatingComponent,
    ProductRowComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', component: SearchableProductTableComponent },
      { path: 'products', component: SearchableProductTableComponent },
      { path: 'products/add', component: ProductUpdatingComponent },
      { path: 'product/:productId', component: ProductDetailsComponent },
      { path: 'cart', component: CartComponent }
    ])
  ],
  providers: [ApiService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
