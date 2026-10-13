export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IAuthResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
