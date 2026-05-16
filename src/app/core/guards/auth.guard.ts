import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const storage = inject(StorageService);
  const router = inject(Router);

  const token = storage.get<string>(STORAGE_KEYS.token);
  return token ? true : router.createUrlTree(['/login']);
};
