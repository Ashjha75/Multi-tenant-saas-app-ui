import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { StorageService } from '../services/storage.service';

export const tenantGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const tenantId = storage.get<string>(STORAGE_KEYS.tenantId);
  return tenantId ? true : router.createUrlTree(['/login']);
};
