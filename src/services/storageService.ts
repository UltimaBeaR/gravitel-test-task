const KEY_JWT_ACCESS_TOKEN = 'jwtAccessToken';

export default class StorageService {
  getJwtAccessToken(): string | null {
    return localStorage.getItem(KEY_JWT_ACCESS_TOKEN);
  }

  setJwtAccessToken(token: string | null) {
    if (token !== null)
      localStorage.setItem(KEY_JWT_ACCESS_TOKEN, token);
    else
      localStorage.removeItem(KEY_JWT_ACCESS_TOKEN);
  }
}