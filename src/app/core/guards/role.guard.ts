import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { StorageService } from '../services/storage.service';

export const roleGuard: CanActivateFn = (route) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const allowedRoles = (route.data?.['roles'] as string[]) ?? [];
  const rawRole = storage.get<string>(STORAGE_KEYS.role);
  const role = rawRole?.replace(/^"|"$/g, '').trim();

  if (!allowedRoles.length) return true;
  
  const currentRole = role?.toUpperCase();
  if (currentRole && allowedRoles.some(r => r.toUpperCase() === currentRole)) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
