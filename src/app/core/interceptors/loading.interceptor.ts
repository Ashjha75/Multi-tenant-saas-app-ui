import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { finalize } from 'rxjs';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const loadingBar = inject(LoadingBarService);
  const ref = loadingBar.useRef('http');

  loading.start();
  ref.start();

  return next(req).pipe(
    finalize(() => {
      loading.stop();
      ref.complete();
    }),
  );
};
