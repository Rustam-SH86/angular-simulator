import { inject, Injectable, Pipe } from '@angular/core';
import { ILoginRequest, IAuthResponse, IRefreshTokenResponse } from './auth.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, pipe, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly LOGIN_URL = 'https://dummyjson.com/auth/login';
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly REFRESH_URL = 'https://dummyjson.com/auth/refresh';
  private readonly ME_URL = 'https://dummyjson.com/auth/me';

  public login(data: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.LOGIN_URL, data).pipe(
      tap((response) => {
        this.saveToken(response.accessToken, response.refreshToken);
      }),
      switchMap(() => this.getCurrentUser()),
    );
  }

  private currentUserSubject = new BehaviorSubject<IAuthResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  public saveToken(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  public getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  public logout(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    this.currentUserSubject.next(null);
  }

  public getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  public refreshToken(): Observable<IRefreshTokenResponse> {
    const refreshToken = this.getRefreshToken();

    return this.http
      .post<IRefreshTokenResponse>(this.REFRESH_URL, {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          this.saveToken(response.accessToken, response.refreshToken);
        }),
      );
  }

  public getCurrentUser(): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(this.ME_URL).pipe(
      tap((user) => {
        this.currentUserSubject.next(user);
      }),
    );
  }

  public initializeAuth(): Observable<IAuthResponse | null> {
    const token = this.getAccessToken();

    if (!token) {
      return of(null);
    }

    return this.getCurrentUser();
  }
}
