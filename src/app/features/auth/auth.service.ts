import { inject, Injectable } from '@angular/core';
import { ILoginRequest, IAuthResponse, IRefreshTokenResponse } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { APP_CONFIG } from '../../interfaces/app-config.token.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly appConfig = inject(APP_CONFIG);
  private http = inject(HttpClient);
  private readonly LOGIN_URL = 'https://dummyjson.com/auth/login';
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly REFRESH_URL = 'https://dummyjson.com/auth/refresh';
  private readonly ME_URL = 'https://dummyjson.com/auth/me';
  private readonly LAST_LOGIN_KEY = 'lastLogin';

  login(data: ILoginRequest): Observable<IAuthResponse> {
    return this.http
      .post<IAuthResponse>(this.LOGIN_URL, {
        ...data,
        expiresInMins: this.appConfig.sessionTimeout,
      })
      .pipe(
        tap((response) => {
          this.saveToken(response.accessToken, response.refreshToken);
          this.saveLastLogin();
        }),
        switchMap(() => this.getCurrentUser()),
      );
  }

  private currentUserSubject = new BehaviorSubject<IAuthResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  private lastLoginSubject = new BehaviorSubject<string | null>(null);
  lastLogin$ = this.lastLoginSubject.asObservable();

  private saveLastLogin(): void {
    const lastLogin = new Date().toISOString();
    localStorage.setItem(this.LAST_LOGIN_KEY, lastLogin);
    this.lastLoginSubject.next(lastLogin);
  }

  saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  refreshToken(): Observable<IRefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();

    return this.http
      .post<IRefreshTokenResponse>(this.REFRESH_URL, {
        refreshToken,
        expiresInMins: this.appConfig.sessionTimeout,
      })
      .pipe(
        tap((response) => {
          this.saveToken(response.accessToken, response.refreshToken);
        }),
      );
  }

  getCurrentUser(): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(this.ME_URL).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
    );
  }

  initializeAuth(): Observable<IAuthResponse | null> {
    const token = this.getAccessToken();

    if (!token) {
      return of(null);
    }

    return this.getCurrentUser();
  }
}
