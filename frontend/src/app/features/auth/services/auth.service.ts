import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'token';

  private readonly _isLogged = signal(false);
  readonly isLogged = this._isLogged.asReadonly();

  login(username: string, password: string): boolean {
    if (username === 'user' && password === '1234') {
      this._isLogged.set(true);
      localStorage.setItem(this.TOKEN_KEY, 'token-back');
      return true;
    }
    return false;
  }

  logout() {
    this._isLogged.set(false);
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
