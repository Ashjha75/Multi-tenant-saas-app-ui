import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PUBLIC_ENDPOINTS } from '../constants/api.constants';
import { STORAGE_KEYS } from '../constants/storage.constants';
import { StorageService } from '../services/storage.service';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const storage = inject(StorageService);
  const tenantId = storage.get<string>(STORAGE_KEYS.tenantId);

  const isPublic = PUBLIC_ENDPOINTS.some((endpoint) => req.url.includes(endpoint));
  if (!tenantId || isPublic || req.headers.has('X-Tenant-ID')) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        'X-Tenant-ID': tenantId,
      },
    }),
  );
};
