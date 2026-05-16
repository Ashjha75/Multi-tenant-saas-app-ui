import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class StockService {
  private readonly baseUrl = `${environment.apiUrl}/stock-mvts`;

  constructor(private readonly http: HttpClient) {}

  getMovements(page = 0, size = 10) {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);
  }
}
