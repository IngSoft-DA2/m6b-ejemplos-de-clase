import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'token';
  private readonly isLogged = signal(false);

  public login(email: string, password: string): boolean {
    if (email === 'user' && password === '1234') {
      this.isLogged.set(true);
      localStorage.setItem(this.TOKEN_KEY, 'token-back');
      return true;
    }

    alert('Invalid credentials');
    return false;
  }

  public logout(): void {
    this.isLogged.set(false);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  public isUserLogged(): boolean {
    return this.isLogged();
  }
}
