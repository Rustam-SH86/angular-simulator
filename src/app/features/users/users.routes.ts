import { Routes } from '@angular/router';
import { UsersFacade } from './application/users.facade';

export const USERS_ROUTES: Routes = [
  {
    path: '',
    providers: [UsersFacade],
    loadComponent: () =>
      import('./pages/users-page/users-page.component').then(
        (component) => component.UsersPageComponent,
      ),
  },
];
