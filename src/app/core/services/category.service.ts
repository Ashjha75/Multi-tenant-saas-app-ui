import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly baseUrl = `${environment.apiUrl}/categories`;

  constructor(private readonly http: HttpClient) {}

  getCategories(page = 0, size = 10) {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getCategoryById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createCategory(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateCategory(id: string, data: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteCategory(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
