import { Routes } from '@angular/router';
import { NotFound } from './shared/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () => import('./features/movies/movies.routes').then((m) => m.MOVIES_ROUTES),
  },
  {
    path: 'actors',
    loadChildren: () => import('./features/actors/actors.routes').then((m) => m.ACTORS_ROUTES),
  },
  {
    path: 'login',
    title: 'Login | Movie Manager',
    loadComponent: () => import('./features/auth/login-page/login-page').then((m) => m.LoginPage),
  },
  {
    path: '**',
    title: 'Not found | Movie Manager',
    component: NotFound,
  },
];
