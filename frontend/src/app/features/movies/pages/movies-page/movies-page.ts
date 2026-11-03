import { Component, inject, OnInit, signal } from '@angular/core';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';
import { MovieCard } from '../../components/movie-card/movie-card';

@Component({
  selector: 'app-movies-page',
  imports: [MovieCard],
  templateUrl: './movies-page.html',
  styleUrl: './movies-page.css',
})
export class MoviesPage implements OnInit {
  private readonly movieService = inject(MovieService);

  readonly movies = this.movieService.movies;
  readonly isLoading = this.movieService.isLoading;
  readonly error = this.movieService.error;

  readonly favoriteIds = signal<ReadonlySet<number>>(new Set());

  ngOnInit() {
    this.movieService.loadPopularMovies();
  }

  onFavoriteToggled(movie: Movie) {
    console.log(`[FavoriteToggled] Recibido en MoviesPage: ${movie.title}`);
    this.favoriteIds.update((ids) => {
      const next = new Set(ids);
      if (!next.delete(movie.id)) {
        next.add(movie.id);
      }
      return next;
    });
  }
}
