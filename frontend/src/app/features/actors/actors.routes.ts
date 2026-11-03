import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth.guard';
import { ActorsPage } from './pages/actors-page/actors-page';
import { ActorDetailsPage } from './pages/actor-details-page/actor-details-page';

export const ACTORS_ROUTES: Routes = [
  {
    path: '',
    title: 'Actors | Movie Manager',
    component: ActorsPage,
    canActivate: [authGuard],
  },
  {
    path: ':id',
    title: 'Actor details | Movie Manager',
    component: ActorDetailsPage,
    canActivate: [authGuard],
  },
];
