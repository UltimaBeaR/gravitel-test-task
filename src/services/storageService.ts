const KEY_JWT_ACCESS_TOKEN = 'jwtAccessToken';

export default class StorageService {
  private _jwtAccessToken: string | null = null;

  constructor() {
    this._loadFromLocalStorage();
  }

  getJwtAccessToken(): string | null {
    return this._jwtAccessToken;
  }

  setJwtAccessToken(token: string) {
    localStorage.setItem(KEY_JWT_ACCESS_TOKEN, token);
    this._jwtAccessToken = token;
  }

  private _loadFromLocalStorage() {
    this._jwtAccessToken = localStorage.getItem(KEY_JWT_ACCESS_TOKEN);
  }
}