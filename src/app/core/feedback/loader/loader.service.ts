import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly visibleState = signal(false);
  readonly visible = this.visibleState.asReadonly();
  private loadingCount = 0;

  showLoader() {
    this.loadingCount++;
    document.body.classList.add('no-scroll');
    this.visibleState.set(true);
  }

  hideLoader() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) {
      document.body.classList.remove('no-scroll');
      this.visibleState.set(false);
    }
  }
}
