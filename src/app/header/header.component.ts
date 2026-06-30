import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  protected readonly companyName = 'РУМТИБЕТ';

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
  ];
}

