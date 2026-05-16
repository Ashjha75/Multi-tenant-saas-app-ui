import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly baseUrl = `${environment.apiUrl}/tenants`;

  constructor(private readonly http: HttpClient) {}

  getTenants(page = 0, size = 10) {
    return this.http.get(`${this.baseUrl}?page=${page}&size=${size}`);
  }
}
