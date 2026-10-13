import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from './auth.facade';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = () => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  return authFacade.currentUser()?.role === 'admin' ? true : router.createUrlTree(['/']);
};
