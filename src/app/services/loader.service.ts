import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  loader$ = this.loaderSubject.asObservable();
  private loadingCount = 0;

  showLoader() {
    this.loadingCount++;
    document.body.classList.add('no-scroll');
    this.loaderSubject.next(true);
  }

  hideLoader() {
    this.loadingCount = Math.max(0, this.loadingCount - 1);
    if (this.loadingCount === 0) {
      document.body.classList.remove('no-scroll');
      this.loaderSubject.next(false);
    }
  }
}
