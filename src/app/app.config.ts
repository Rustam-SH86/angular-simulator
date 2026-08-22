import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';

import { loggingInterceptor } from './interceptors/logging.interceptor';
import { serverErrorInterceptor } from './interceptors/server-error.interceptor';
import { loaderInterceptor } from './interceptors/loader.interceptor';

import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './features/auth/auth.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideZoneChangeDetection(),

    provideAnimationsAsync(),

    provideHttpClient(
      withInterceptors([
        loggingInterceptor,
        serverErrorInterceptor,
        loaderInterceptor,
        authInterceptor,
      ]),
    ),

    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    }),

    provideAppInitializer(() => {
      const authService = inject(AuthService);

      return firstValueFrom(
        authService.initializeAuth()
      );
    }),
  ],
};