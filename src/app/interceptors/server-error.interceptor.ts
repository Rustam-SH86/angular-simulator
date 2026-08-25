import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from '../services/message.service';

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let text = 'Unable to complete the request.';

      if (error.status === 0) {
        text = 'Network error. Please check your connection.';
      } else if (error.status === 400 && req.url.includes('/auth/login')) {
        text = 'Invalid username or password.';
      } else if (error.status === 400) {
        text = 'Invalid request.';
      } else if (error.status === 404) {
        text = 'Requested resource was not found.';
      } else if (error.status >= 500) {
        text = 'Server error. Please try again later.';
      }

      messageService.showError(text);

      return throwError(() => error);
    }),
  );
};
