import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { NotificationService } from '../services/notification.service';

interface ApiError {
  status?: number;
  message?: string;
}

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notifier = inject(NotificationService);
  const authService = inject(AuthService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      const apiError = (error.error ?? {}) as ApiError;
      const message = apiError.message ?? error.message ?? 'Something went wrong';

      switch (error.status) {
        case 401:
          notifier.error('Session expired. Please login again.');
          authService.logout(false);
          void router.navigate(['/login']);
          break;
        case 403:
          notifier.error('You do not have permission to perform this action.');
          break;
        case 404:
          notifier.warning('Requested resource was not found.');
          break;
        default:
          notifier.error(message);
      }

      return throwError(() => error);
    }),
  );
};
