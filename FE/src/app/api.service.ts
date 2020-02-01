import { IProduct } from './data/product';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  getMobiles(): Promise<IProduct[]> {
    return new Promise<IProduct[]>(resolve => {
      this.http.get(API_URL + '/mobile/getAll').toPromise()
        .then(data => {
          resolve(data as IProduct[]);
        });
    });
  }

  getMobileById(id: number): Promise<IProduct> {
    return new Promise<IProduct>(resolve => {
      this.http.get(API_URL + '/mobile/getById/' + id).toPromise()
        .then(data => {
          resolve(data as IProduct);
        });
    });
  }

  saveMobile(product: IProduct): Promise<IProduct> {
    return new Promise<IProduct>(resolve => {
      this.http.post<IProduct>(API_URL + '/mobile/save', product).toPromise()
        .then(data => {
          resolve(data as IProduct);
        });
    });
  }

  deleteMobileById(id: number): Promise<IProduct[]> {
    return new Promise(resolve => {
      this.http.delete(API_URL + '/mobile/delete/' + id).toPromise()
        .then(data => {
          resolve(data as IProduct[]);
        });
    });
  }

  orderMobiles(order): Promise<IProduct[]> {
    return new Promise(resolve => {
      this.http.post(API_URL + '/mobile/order', order).toPromise()
        .then(data => {
          resolve(data as IProduct[]);
        });
    });
  }
}
