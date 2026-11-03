import { Component, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details-page',
  imports: [RouterLink],
  templateUrl: './movie-details-page.html',
  styleUrl: './movie-details-page.css',
})
export class MovieDetailsPage {
  private readonly movieService = inject(MovieService);

  // Llega desde la ruta ':id' gracias a withComponentInputBinding()
  readonly id = input.required<string>();

  readonly movie = this.movieService.movie;
  readonly isLoading = this.movieService.isLoadingMovie;
  readonly error = this.movieService.movieError;

  constructor() {
    // Se vuelve a ejecutar cada vez que cambia el :id de la URL
    effect(() => this.movieService.loadMovie(Number(this.id())));
  }
}
