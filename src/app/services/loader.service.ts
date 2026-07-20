import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  public loader$ = this.loaderSubject.asObservable();

  showLoader() {
    document.body.classList.add('no-scroll');
    this.loaderSubject.next(true);
  }

  hideLoader() {
    document.body.classList.remove('no-scroll');
    this.loaderSubject.next(false);
  }
}
