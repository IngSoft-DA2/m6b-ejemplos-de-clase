import { Routes } from '@angular/router';
import { MoviesPage } from './pages/movies-page/movies-page';
import { MovieDetailsPage } from './pages/movie-details-page/movie-details-page';

export const MOVIES_ROUTES: Routes = [
  {
    path: '',
    title: 'Movies | Movie Manager',
    component: MoviesPage,
  },
  {
    path: ':id',
    title: 'Movie details | Movie Manager',
    component: MovieDetailsPage,
  },
];
