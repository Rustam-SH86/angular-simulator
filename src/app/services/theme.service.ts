import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './localstorage.service';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { usePreset } from '@primeuix/themes';

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
  private readonly localStorageService = inject(LocalStorageService);
  private readonly THEME_STORAGE_KEY = 'theme-state';
  private readonly themeStateSubject = new BehaviorSubject<IThemeState>(this.getInitialState());
  readonly themeState$ = this.themeStateSubject.asObservable();

  constructor() {
    const initialState = this.themeStateSubject.value;

    this.applyTheme(initialState.theme);
    this.applyColorMode(initialState.colorMode);
  }

  private getInitialState(): IThemeState {
    const currentThemeInStorage = this.localStorageService.getValue<IThemeState>(
      this.THEME_STORAGE_KEY,
    );
    return currentThemeInStorage ?? DEFAULT_THEME_STATE;
  }

  private saveState(state: IThemeState): void {
    this.localStorageService.setValue(this.THEME_STORAGE_KEY, state);
  }

  setTheme(theme: AppTheme): void {
    const currentState = this.themeStateSubject.value;

    const newState: IThemeState = {
      ...currentState,
      theme,
    };
    this.themeStateSubject.next(newState);
    this.saveState(newState);
    this.applyTheme(theme);
  }

  setColorMode(colorMode: ColorMode): void {
    const currentState = this.themeStateSubject.value;

    const newState: IThemeState = {
      ...currentState,
      colorMode,
    };
    this.themeStateSubject.next(newState);
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
