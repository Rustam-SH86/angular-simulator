import { Component, inject } from '@angular/core';
import { LocalStorageService } from './core/storage/local-storage.service';
import { HeaderComponent } from './core/layout/header/header.component';
import { FooterComponent } from './core/layout/footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MessageCenterComponent } from './core/feedback/messages/message-center.component';
import { LoaderComponent } from './core/feedback/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MessageCenterComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly localStorageService = inject(LocalStorageService);

  constructor() {
    this.saveVisitsCountAndDate();
  }

  saveVisitsCountAndDate(): void {
    let currentVisit = this.localStorageService.getValue<number>('visitsCount') ?? 0;
    currentVisit++;
    this.localStorageService.setValue('visitsCount', currentVisit);
    this.localStorageService.setValue('lastVisitDate', new Date().toLocaleString());
  }
}
