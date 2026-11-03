import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserRolePipe } from '../pipes/user-role.pipe';
import { AuthService } from '../../features/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, UserRolePipe],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly isLogged = this.authService.isLogged;
  readonly role = computed(() => this.authService.getUserRole());

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
