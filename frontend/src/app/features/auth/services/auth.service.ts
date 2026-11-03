import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';

  // El estado se inicializa desde localStorage para que la sesión sobreviva a un F5
  private readonly _isLogged = signal(localStorage.getItem(this.TOKEN_KEY) !== null);
  readonly isLogged = this._isLogged.asReadonly();

  // Login mockeado: en una app real el token (JWT) lo devolvería el backend
  login(username: string, password: string): boolean {
    if (username !== 'user' || password !== '1234') {
      return false;
    }

    const fakeToken = `mock-token-${Math.random().toString(36).substring(2)}`;
    localStorage.setItem(this.TOKEN_KEY, fakeToken);
    this._isLogged.set(true);
    return true;
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this._isLogged.set(false);
  }

  // Lo usa el authInterceptor para adjuntar el header Authorization
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  // En una app real el rol vendría como claim dentro del JWT
  getUserRole(): string {
    return this.isLogged() ? 'user' : 'guest';
  }
}
