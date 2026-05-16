import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { StorageService } from '../services/storage.service';

export const roleGuard: CanActivateFn = (route) => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const allowedRoles = (route.data?.['roles'] as string[]) ?? [];
  const role = storage.get<string>(STORAGE_KEYS.role);

  if (!allowedRoles.length) return true;
  if (role && allowedRoles.includes(role)) return true;

  return router.createUrlTree(['/login']);
};
