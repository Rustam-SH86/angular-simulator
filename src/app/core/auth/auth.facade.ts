import { inject, Injectable, signal } from '@angular/core';
import { ILoginRequest, IAuthResponse, IRefreshTokenResponse } from './auth.model';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';
import { LocalStorageService } from '../storage/local-storage.service';
import { AuthApiService } from './auth-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  private readonly authApi = inject(AuthApiService);
  private readonly storage = inject(LocalStorageService);
  private readonly accessTokenKey = 'accessToken';
  private readonly refreshTokenKey = 'refreshToken';
  private readonly lastLoginKey = 'lastLogin';

  private readonly currentUserState = signal<IAuthResponse | null>(null);
  readonly currentUser = this.currentUserState.asReadonly();

  private readonly lastLoginState = signal(this.storage.getString(this.lastLoginKey));
  readonly lastLogin = this.lastLoginState.asReadonly();

  login(data: ILoginRequest): Observable<IAuthResponse> {
    return this.authApi.login(data).pipe(
      tap((response) => {
        this.saveToken(response.accessToken, response.refreshToken);
        this.saveLastLogin();
      }),
      switchMap(() => this.getCurrentUser()),
    );
  }

  private saveLastLogin(): void {
    const lastLogin = new Date().toISOString();
    this.storage.setString(this.lastLoginKey, lastLogin);
    this.lastLoginState.set(lastLogin);
  }

  saveToken(accessToken: string, refreshToken: string): void {
    this.storage.setString(this.accessTokenKey, accessToken);
    this.storage.setString(this.refreshTokenKey, refreshToken);
  }

  getAccessToken(): string | null {
    return this.storage.getString(this.accessTokenKey);
  }

  logout(): void {
    this.storage.deleteValue(this.accessTokenKey);
    this.storage.deleteValue(this.refreshTokenKey);
    this.currentUserState.set(null);
  }

  getRefreshToken(): string | null {
    return this.storage.getString(this.refreshTokenKey);
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();

    return this.authApi.refresh(refreshToken).pipe(
      tap((response) => {
        this.saveToken(response.accessToken, response.refreshToken);
      }),
    );
  }

  getCurrentUser(): Observable<IAuthResponse> {
    return this.authApi.getCurrentUser().pipe(
      tap((user) => {
        this.currentUserState.set(user);
      }),
    );
  }

  initializeAuth(): Observable<IAuthResponse | null> {
    const token = this.getAccessToken();

    if (!token) {
      return of(null);
    }

    return this.getCurrentUser().pipe(
      catchError(() => {
        this.logout();
        return of(null);
      }),
    );
  }
}
