import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APP_CONFIG } from '../config/app-config.token';
import { IAuthResponse, ILoginRequest, IRefreshTokenResponse } from './auth.model';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly appConfig = inject(APP_CONFIG);
  private readonly loginUrl = 'https://dummyjson.com/auth/login';
  private readonly refreshUrl = 'https://dummyjson.com/auth/refresh';
  private readonly currentUserUrl = 'https://dummyjson.com/auth/me';

  login(data: ILoginRequest): Observable<IAuthResponse> {
    return this.http.post<IAuthResponse>(this.loginUrl, {
      ...data,
      expiresInMins: this.appConfig.sessionTimeout,
    });
  }

  refresh(refreshToken: string | null): Observable<IRefreshTokenResponse> {
    return this.http.post<IRefreshTokenResponse>(this.refreshUrl, {
      refreshToken,
      expiresInMins: this.appConfig.sessionTimeout,
    });
  }

  getCurrentUser(): Observable<IAuthResponse> {
    return this.http.get<IAuthResponse>(this.currentUserUrl);
  }
}
