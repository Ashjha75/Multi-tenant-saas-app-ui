import { Injectable, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly accessToken = signal<string | null>(localStorage.getItem('access_token'));

  setToken(token: string): void {
    this.accessToken.set(token);
    localStorage.setItem('access_token', token);
  }

  clearToken(): void {
    this.accessToken.set(null);
    localStorage.removeItem('access_token');
  }

  getDecodedToken<T>(): T | null {
    const token = this.accessToken();
    if (!token) return null;

    try {
      return jwtDecode<T>(token);
    } catch {
      return null;
    }
  }
}
