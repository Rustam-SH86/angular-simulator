import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setString(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  getString(key: string): string | null {
    return localStorage.getItem(key);
  }

  setValue<T>(item: string, value: T): void {
    localStorage.setItem(item, JSON.stringify(value));
  }

  getValue<T>(item: string): T | null {
    const value = localStorage.getItem(item);
    return value ? JSON.parse(value) : null;
  }

  deleteValue(item: string): void {
    localStorage.removeItem(item);
  }

  clearStorage() {
    localStorage.clear();
  }
}
