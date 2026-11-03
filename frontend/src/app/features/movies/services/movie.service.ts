import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Movie, MovieDetails } from '../models/movie.model';

@Injectable({ providedIn: 'root' }) // Servicio singleton disponible en toda la aplicación
export class MovieService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.tmdbApiUrl;
  private readonly apiKey = environment.tmdbApiKey;
  private readonly imageBaseUrl = environment.tmdbImageBaseUrl;

  // Estado de la lista
  private readonly _movies = signal<Movie[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);

  readonly movies = this._movies.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly error = this._error.asReadonly();

  // Estado del detalle
  private readonly _movie = signal<MovieDetails | undefined>(undefined);
  private readonly _isLoadingMovie = signal(false);
  private readonly _movieError = signal<string | null>(null);

  readonly movie = this._movie.asReadonly();
  readonly isLoadingMovie = this._isLoadingMovie.asReadonly();
  readonly movieError = this._movieError.asReadonly();

  loadPopularMovies() {
    this._isLoading.set(true);
    this._error.set(null);

    // La request recién se envía al hacer subscribe
    this.http
      .get<{ results: Movie[] }>(`${this.apiUrl}/movie/popular`, {
        params: { api_key: this.apiKey, language: 'es-ES' },
      })
      .subscribe({
        next: (response) => {
          this._movies.set(response.results.map((movie) => this.withPosterUrl(movie)));
          this._isLoading.set(false);
        },
        error: (err) => {
          console.error('Error fetching movies:', err);
          this._error.set('No se pudieron cargar las películas');
          this._isLoading.set(false);
        },
      });
  }

  loadMovie(id: number) {
    this._isLoadingMovie.set(true);
    this._movieError.set(null);
    this._movie.set(undefined);

    this.http
      .get<MovieDetails>(`${this.apiUrl}/movie/${id}`, {
        params: { api_key: this.apiKey, language: 'es-ES' },
      })
      .subscribe({
        next: (movie) => {
          this._movie.set(this.withPosterUrl(movie));
          this._isLoadingMovie.set(false);
        },
        error: (err) => {
          console.error(`Error fetching movie ${id}:`, err);
          this._movieError.set('No se pudo cargar la película');
          this._isLoadingMovie.set(false);
        },
      });
  }

  private withPosterUrl<T extends Movie>(movie: T): T {
    return {
      ...movie,
      poster_path: movie.poster_path ? `${this.imageBaseUrl}${movie.poster_path}` : null,
    };
  }
}
