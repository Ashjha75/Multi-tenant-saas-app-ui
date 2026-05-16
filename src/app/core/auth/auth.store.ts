import { Injectable, computed, signal } from '@angular/core';
import { AppRole } from '../constants/role.constants';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  readonly token = signal<string>('');
  readonly user = signal<User | null>(null);

  readonly isAuthenticated = computed(() => !!this.token());
  readonly tenantId = computed(() => this.user()?.tenantId ?? null);
  readonly role = computed<AppRole | null>(() => this.user()?.role ?? null);

  setAuth(token: string, user: User): void {
    this.token.set(token);
    this.user.set(user);
  }

  clear(): void {
    this.token.set('');
    this.user.set(null);
  }
}
