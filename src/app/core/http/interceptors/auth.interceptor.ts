import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthFacade } from '../../auth/auth.facade';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  if (req.url.includes('/auth/login') || req.url.includes('/auth/refresh')) {
    return next(req);
  }

  const token = authFacade.getAccessToken();

  if (!token) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401) {
        return throwError(() => error);
      }

      const refreshToken = authFacade.getRefreshToken();

      if (!refreshToken) {
        authFacade.logout();
        router.navigate(['/login']);

        return throwError(() => error);
      }

      return authFacade.refreshToken().pipe(
        switchMap((response) => {
          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`,
            },
          });

          return next(retryReq);
        }),

        catchError((refreshError) => {
          authFacade.logout();
          router.navigate(['/login']);

          return throwError(() => refreshError);
        }),
      );
    }),
  );
};
