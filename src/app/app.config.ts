import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';

import { loggingInterceptor } from './core/http/interceptors/logging.interceptor';
import { serverErrorInterceptor } from './core/http/interceptors/server-error.interceptor';
import { loaderInterceptor } from './core/http/interceptors/loader.interceptor';

import { authInterceptor } from './core/http/interceptors/auth.interceptor';
import { AuthFacade } from './core/auth/auth.facade';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { APP_CONFIG, IAppConfig } from './core/config/app-config.token';

const applicationConfig: IAppConfig = {
  companyName: 'РУМТИБЕТ',
  enableLogs: true,
  enableNotifications: true,
  enableTheming: true,
  sessionTimeout: 1,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: {
        dateFormat: 'dd.MM.yyyy HH:mm',
      },
    },
    {
      provide: APP_CONFIG,
      useValue: applicationConfig,
    },

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
      const authFacade = inject(AuthFacade);

      return firstValueFrom(authFacade.initializeAuth());
    }),
  ],
};
