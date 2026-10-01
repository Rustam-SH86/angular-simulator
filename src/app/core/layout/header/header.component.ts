import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';

import { AuthFacade } from '../../auth/auth.facade';
import { APP_CONFIG } from '../../config/app-config.token';
import { AppTheme, ThemeService } from '../../theme/theme.service';
@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ToggleSwitchModule,
    DatePipe,
    SelectButtonModule,
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly appConfig = inject(APP_CONFIG);
  private readonly themeService = inject(ThemeService);
  private readonly authFacade = inject(AuthFacade);
  private readonly router = inject(Router);

  readonly themeState = this.themeService.themeState;

  readonly currentUser = this.authFacade.currentUser;
  readonly lastLogin = this.authFacade.lastLogin;

  readonly themeOptions = [
    { label: 'Aura', value: 'aura' },
    { label: 'Lara', value: 'lara' },
    { label: 'Nora', value: 'nora' },
  ];

  headerItems = [
    {
      name: 'Главная',
      path: '',
      exact: true,
    },
    {
      name: 'Пользователи',
      path: 'users',
      exact: false,
    },
    {
      name: 'Посты',
      path: 'posts',
      exact: false,
    },
    {
      name: 'Продукты',
      path: 'products',
      exact: false,
    },
  ];

  onColorModeChange(checked: boolean): void {
    const colorMode = checked ? 'dark' : 'light';

    this.themeService.setColorMode(colorMode);
  }

  onThemeChange(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }

  logout(): void {
    this.authFacade.logout();
    this.router.navigate(['/login']);
  }
}
