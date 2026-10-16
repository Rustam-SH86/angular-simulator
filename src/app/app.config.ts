import {
  ApplicationConfig,
  inject,
  isDevMode,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';

import { APP_CONFIG, IAppConfig } from './core/config/app-config.token';

import { AuthFacade } from './core/auth/auth.facade';

import { authInterceptor } from './core/http/interceptors/auth.interceptor';
import { loaderInterceptor } from './core/http/interceptors/loader.interceptor';
import { loggingInterceptor } from './core/http/interceptors/logging.interceptor';
import { serverErrorInterceptor } from './core/http/interceptors/server-error.interceptor';

import { RecipesEffects } from './features/recipes/store/recipes.effects';
import { recipesReducer } from './features/recipes/store/recipes.reducer';
import { RECIPES_FEATURE_KEY } from './features/recipes/store/recipes.selectors';

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

    provideStore({
      [RECIPES_FEATURE_KEY]: recipesReducer,
    }),

    provideEffects(RecipesEffects),

    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
    }),

    provideAppInitializer(() => {
      const authFacade = inject(AuthFacade);

      return firstValueFrom(authFacade.initializeAuth());
    }),
  ],
};
