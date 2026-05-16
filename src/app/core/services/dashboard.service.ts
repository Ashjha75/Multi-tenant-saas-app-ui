import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private readonly baseUrl = `${environment.apiUrl}/analytics`;

  constructor(private readonly http: HttpClient) {}

  getPlatformSummary() {
    return this.http.get(`${this.baseUrl}/platform-summary`);
  }

  getWorkspaceSummary() {
    return this.http.get(`${this.baseUrl}/workspace-summary`);
  }
}
