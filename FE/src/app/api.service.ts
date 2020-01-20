import { IProduct } from './data/product';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  login(user: string, password: string): boolean {
    this.http.post(API_URL + '/login', {user, password});

    return true;
  }


  getMobiles(): Observable<IProduct[]> {
    try {
      let products;
      this.http.get(API_URL + '/mobile')
        .subscribe(items => { products = items as IProduct[]; });

      return products;
    } catch (error) {
      this.handleError(error);
    }
  }

  getMobileById(id: number): Observable<IProduct> {
    try {
      return this.http.get<IProduct>(API_URL + '/mobile/' + id);
    } catch (error) {
      this.handleError(error);
    }
  }

  createMobile(product: IProduct): Observable<IProduct> {
    try {
      return this.http.post<IProduct>(API_URL + '/mobile', product);
    } catch (error) {
      this.handleError(error);
    }
  }

  updateMobile(product: IProduct): Observable<IProduct> {
    try {
      return this.http.put<IProduct>(API_URL + '/mobile/' + product.name, product);
    } catch (error) {
      this.handleError(error);
    }
  }

  deleteMobileById(id: number): Observable<null> {
    try {
      return this.http.delete<null>(API_URL + '/mobile/' + id);
    } catch (error) {
      this.handleError(error);
    }
  }

  handleError(error: Response | any) {
    Observable.throw(error);
  }

}
