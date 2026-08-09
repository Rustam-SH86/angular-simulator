import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageService } from './services/message.service';
import { inject } from '@angular/core';

export const serverErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error) => {
      if (error?.status >= 500 && error?.status < 600) {
        console.error('Server Error:', error);
        messageService.showError('An unexpected server error occurred. Please try again later.');
      }
      return throwError(() => error);
    }),
  );
};
