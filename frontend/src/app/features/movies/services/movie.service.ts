import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Movie } from '../models/movie.model';

interface TmdbMovieSummary {
  id: number;
  title: string;
  release_date: string;
  genre_ids: number[];
  poster_path: string | null;
  overview: string;
}

interface TmdbMovieDetails {
  id: number;
  title: string;
  release_date: string;
  genres: { id: number; name: string }[];
  poster_path: string | null;
  overview: string;
}

interface TmdbPagedResponse<T> {
  results: T[];
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.themoviedb.org/3';
  private readonly apiKey = '36eb10aa56ea823b1b3c7370a05aeb09';
  private readonly posterBaseUrl = 'https://image.tmdb.org/t/p/w500';

  getMovies(): Observable<Movie[]> {
    return this.http.get<TmdbPagedResponse<TmdbMovieSummary>>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}`).pipe(
      map(response => response.results.map(item => ({
        id: item.id,
        title: item.title,
        releaseYear: new Date(item.release_date).getFullYear(),
        genre: item.genre_ids.join(', '),
        posterUrl: `${this.posterBaseUrl}${item.poster_path}`,
        overview: item.overview
      }))),
      catchError(this.handleError<Movie[]>('getMovies', []))
    );
  }

  getMovieById(id: number): Observable<Movie | undefined> {
    return this.http.get<TmdbMovieDetails>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`).pipe(
      map(item => ({
        id: item.id,
        title: item.title,
        releaseYear: new Date(item.release_date).getFullYear(),
        genre: item.genres.map(g => g.name).join(', '),
        posterUrl: `${this.posterBaseUrl}${item.poster_path}`,
        overview: item.overview
      })),
      catchError(this.handleError<Movie | undefined>(`getMovieById id=${id}`, undefined))
    );
  }

  private handleError<T>(operation: string, result: T) {
    return (error: unknown): Observable<T> => {
      console.error(`${operation} failed:`, error);
      return of(result);
    };
  }
}
