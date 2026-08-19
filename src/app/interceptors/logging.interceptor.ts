import { HttpInterceptorFn, HttpEventType } from '@angular/common/http';
import { tap, catchError, throwError } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const startedAt = performance.now();
  console.log('Request', req.method, req.url);

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
