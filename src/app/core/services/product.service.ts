import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/products`;

  constructor(private readonly http: HttpClient) {}

  getProducts(page = 0, size = 10) {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getProductById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createProduct(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateProduct(id: string, data: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
