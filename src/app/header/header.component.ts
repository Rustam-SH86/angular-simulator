import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SelectButtonModule } from 'primeng/selectbutton';

import { AppTheme, ThemeService } from '../services/theme.service';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink,
    RouterLinkActive,
    FormsModule,
    ToggleSwitchModule,
    AsyncPipe,
    SelectButtonModule,
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly companyName = 'РУМТИБЕТ';

  private readonly themeService = inject(ThemeService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public readonly themeState$ = this.themeService.themeState$;

  public readonly currentUser$ = this.authService.currentUser$;

  public readonly themeOptions = [
    { label: 'Aura', value: 'aura' },
    { label: 'Lara', value: 'lara' },
    { label: 'Nora', value: 'nora' },
  ];

  public headerItems = [
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
  ];

  public onColorModeChange(checked: boolean): void {
    console.log('Toggle value:', checked);

    const colorMode = checked ? 'dark' : 'light';

    this.themeService.setColorMode(colorMode);
  }

  public onThemeChange(theme: AppTheme): void {
    this.themeService.setTheme(theme);
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
