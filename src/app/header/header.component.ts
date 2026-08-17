import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AppTheme, ThemeService } from '../services/theme.service';
import { AsyncPipe } from '@angular/common';
import { SelectButtonModule } from 'primeng/selectbutton';

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
  public readonly themeState$ = this.themeService.themeState$;

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
      name: ' Посты',
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
}
