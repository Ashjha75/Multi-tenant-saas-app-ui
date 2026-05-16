import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private readonly http: HttpClient) {}

  getUsers(page = 0, size = 10) {
    return this.http.get<any>(`${this.baseUrl}?page=${page}&size=${size}`);
  }

  getUserById(id: string) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  createUser(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }

  updateUser(id: string, data: any) {
    return this.http.put<any>(`${this.baseUrl}/${id}`, data);
  }

  deleteUser(id: string) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  enableUser(id: string) {
    return this.http.post<any>(`${this.baseUrl}/${id}/enable`, {});
  }

  disableUser(id: string) {
    return this.http.post<any>(`${this.baseUrl}/${id}/disable`, {});
  }
}
