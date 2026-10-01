import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthFacade } from './auth.facade';

export const authGuard: CanActivateFn = (_route, state) => {
  const authFacade = inject(AuthFacade);
  const router = inject(Router);

  if (authFacade.currentUser()) {
    return true;
  }

  return router.createUrlTree(['/login'], {
    queryParams: {
      returnUrl: state.url,
    },
  });
};
