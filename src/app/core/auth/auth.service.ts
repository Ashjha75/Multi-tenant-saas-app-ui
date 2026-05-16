import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { API_ENDPOINTS } from '../constants/api.constants';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { User } from '../models/user.model';
import { StorageService } from '../services/storage.service';
import {
  JwtPayload,
  LoginRequest,
  LoginResponse,
  RegisterTenantRequest,
  RegisterTenantResponse,
} from './auth.model';
import { AuthStore } from './auth.store';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly baseUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly store: AuthStore,
    private readonly storage: StorageService,
    private readonly router: Router,
  ) {}

  login(payload: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}${API_ENDPOINTS.login}`, payload).pipe(
      map((response) => {
        const normalizedToken = response.token ?? response.accessToken ?? '';
        return { ...response, token: normalizedToken };
      }),
      tap((response) => this.persistSession(response)),
    );
  }

  registerTenant(payload: RegisterTenantRequest) {
    return this.http.post<RegisterTenantResponse>(`${this.baseUrl}${API_ENDPOINTS.register}`, payload);
  }

  hydrateFromStorage(): void {
    const token = this.storage.get<string>(STORAGE_KEYS.token);
    const user = this.storage.get<User>(STORAGE_KEYS.user);

    if (token && user) {
      this.store.setAuth(token, user);
    }
  }

  logout(redirectToLogin = true): void {
    // Call server-side logout first
    this.http.post(`${this.baseUrl}/auth/logout`, {}).subscribe({
      next: () => this.finalizeLogout(redirectToLogin),
      error: () => this.finalizeLogout(redirectToLogin) // Clear local state anyway
    });
  }

  private finalizeLogout(redirectToLogin: boolean): void {
    this.store.clear();
    this.storage.remove(STORAGE_KEYS.token);
    this.storage.remove(STORAGE_KEYS.tenantId);
    this.storage.remove(STORAGE_KEYS.user);
    this.storage.remove(STORAGE_KEYS.role);

    if (redirectToLogin) {
      void this.router.navigate(['/login']);
    }
  }

  navigatePostLogin(role: string): void {
    const normalizedRole = role.toUpperCase().replace(/^"|"$/g, '').trim();
    if (normalizedRole === 'ROLE_PLATFORM_ADMIN' || normalizedRole === 'ROLE_ADMINISTRATOR') {
      void this.router.navigate(['/workspace/dashboard']);
      return;
    }

    void this.router.navigate(['/workspace/dashboard']);
  }

  private persistSession(response: LoginResponse): void {
    const token = response.token ?? '';
    if (!token) return;

    const decoded = jwtDecode<JwtPayload>(token);
    const user: User = {
      username: response.username ?? decoded.sub ?? 'unknown',
      role: response.role ?? decoded.role ?? 'ROLE_USER',
      tenantId: response.tenantId ?? decoded.tenantId ?? 'public',
      companyName: response.companyName ?? decoded.companyName,
      exp: decoded.exp,
    };

    this.store.setAuth(token, user);
    this.storage.set(STORAGE_KEYS.token, token);
    this.storage.set(STORAGE_KEYS.tenantId, user.tenantId);
    this.storage.set(STORAGE_KEYS.user, user);
    this.storage.set(STORAGE_KEYS.role, user.role);
  }
}
