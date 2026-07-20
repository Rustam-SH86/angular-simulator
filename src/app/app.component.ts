import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from './services/localstorage.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterOutlet } from '@angular/router';
import { MessageServiceComponent } from './message-service/message-service.component';
import { LoaderComponent } from './loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MessageServiceComponent,
    LoaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  protected isLoading = true;

  public localstorageService: LocalStorageService = inject(LocalStorageService);

  constructor() {
    this.saveVisitsCountAndDate();
    this.stopLoader();
  }

  saveVisitsCountAndDate(): void {
    let currentVisit = this.localstorageService.getValue<number>('visitsCount') ?? 0;
    currentVisit++;
    this.localstorageService.setValue('visitsCount', currentVisit);
    this.localstorageService.setValue('lastVisitDate', new Date().toLocaleString());
  }

  stopLoader(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
