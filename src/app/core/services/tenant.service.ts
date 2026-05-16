import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TenantService {
  private readonly baseUrl = `${environment.apiUrl}/tenants`;

  constructor(private readonly http: HttpClient) {}

  getTenants(page = 0, size = 10) {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getPendingTenants(page = 0, size = 10) {
    return this.http.get<any>(`${this.baseUrl}/pending?page=${page}&size=${size}`);
  }

  approveTenant(id: string) {
    return this.http.post<any>(`${this.baseUrl}/${id}/approve`, {});
  }

  activateTenant(id: string) {
    return this.http.post<any>(`${this.baseUrl}/${id}/activate`, {});
  }

  deactivateTenant(id: string) {
    return this.http.post<any>(`${this.baseUrl}/${id}/deactivate`, {});
  }

  suspendTenant(id: string) {
    return this.http.post<any>(`${this.baseUrl}/${id}/suspend`, {});
  }
}
