import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  products: ProductResponseModel[] = [];
  ServerURL = environment.backApiUrl;

  constructor(private http: HttpClient) {
  }


  getSingleOrder(orderId: number) {
    return this.http.get<ProductResponseModel[]>(`${this.ServerURL}orders/${orderId}`).toPromise();
  }
}

interface ProductResponseModel {
  id: number;
  title: String;
  description: String;
  price: number;
  quantityOrdered: number;
  image: String;
}
