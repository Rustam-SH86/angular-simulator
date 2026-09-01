import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';
import { APP_CONFIG } from '../interfaces/app-config.token.interfaces';
import { inject } from '@angular/core';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const appConfig = inject(APP_CONFIG);
  const startedAt = performance.now();
  console.log('Request', req.method, req.url);

  if (!appConfig.enableLogs) {
    return next(req);
  }

  return next(req).pipe(
    tap((event) => {
      if (event.type === HttpEventType.Response) {
        console.log('Status:', event.status);
        const duration = performance.now() - startedAt;
        console.log('Duration:', duration);
      }
    }),
    catchError((error) => {
      const duration = performance.now() - startedAt;
      console.error('Error Status:', error?.status ?? error);
      console.log('Duration:', duration);
      return throwError(() => error);
    }),
  );
};
