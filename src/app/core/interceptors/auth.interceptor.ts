import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');
  const tenantId = localStorage.getItem('tenant_id');

  let cloned = req;

  if (token) {
    cloned = cloned.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  if (tenantId && !cloned.headers.has('X-Tenant-ID')) {
    cloned = cloned.clone({
      setHeaders: {
        'X-Tenant-ID': tenantId,
      },
    });
  }

  return next(cloned);
};
