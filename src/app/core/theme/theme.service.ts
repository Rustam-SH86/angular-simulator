import { inject, Injectable, signal } from '@angular/core';
import { LocalStorageService } from '../storage/local-storage.service';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { usePreset } from '@primeuix/themes';
import { APP_CONFIG } from '../config/app-config.token';

export type AppTheme = 'aura' | 'lara' | 'nora';
export type ColorMode = 'light' | 'dark';

export interface IThemeState {
  theme: AppTheme;
  colorMode: ColorMode;
}

const DEFAULT_THEME_STATE: IThemeState = {
  theme: 'aura',
  colorMode: 'light',
};

const THEME_PRESETS = {
  aura: Aura,
  lara: Lara,
  nora: Nora,
};

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly appConfig = inject(APP_CONFIG);
  private readonly localStorageService = inject(LocalStorageService);
  private readonly themeStorageKey = 'theme-state';
  private readonly themeStateValue = signal<IThemeState>(this.getInitialState());
  readonly themeState = this.themeStateValue.asReadonly();

  constructor() {
    const initialState = this.themeStateValue();

    this.applyTheme(initialState.theme);
    this.applyColorMode(initialState.colorMode);
  }

  private getInitialState(): IThemeState {
    if (!this.appConfig.enableTheming) {
      return DEFAULT_THEME_STATE;
    }
    const currentThemeInStorage = this.localStorageService.getValue<IThemeState>(
      this.themeStorageKey,
    );
    return currentThemeInStorage ?? DEFAULT_THEME_STATE;
  }

  private saveState(state: IThemeState): void {
    this.localStorageService.setValue(this.themeStorageKey, state);
  }

  setTheme(theme: AppTheme): void {
    if (!this.appConfig.enableTheming) {
      return;
    }
    const currentState = this.themeStateValue();

    const newState: IThemeState = {
      ...currentState,
      theme,
    };
    this.themeStateValue.set(newState);
    this.saveState(newState);
    this.applyTheme(theme);
  }

  setColorMode(colorMode: ColorMode): void {
    if (!this.appConfig.enableTheming) {
      return;
    }
    const currentState = this.themeStateValue();

    const newState: IThemeState = {
      ...currentState,
      colorMode,
    };
    this.themeStateValue.set(newState);
    this.saveState(newState);
    this.applyColorMode(colorMode);
  }

  private applyColorMode(colorMode: ColorMode): void {
    document.documentElement.classList.toggle('app-dark', colorMode === 'dark');
  }

  private applyTheme(theme: AppTheme): void {
    usePreset(THEME_PRESETS[theme]);
  }
}
