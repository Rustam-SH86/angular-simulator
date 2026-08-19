import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import Aura from '@primeuix/themes/aura';
import { routes } from './app.routes';
import { loggingInterceptor } from './interceptors/logging.interceptor';
import {serverErrorInterceptor} from './interceptors/server-error.interceptor';
import { loaderInterceptor } from './interceptors/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([loggingInterceptor,serverErrorInterceptor,loaderInterceptor])),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.app-dark',
        },
      },
    }),
  ],
};
