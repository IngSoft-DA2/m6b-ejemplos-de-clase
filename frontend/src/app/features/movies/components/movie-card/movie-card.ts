import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.css',
})
export class MovieCard {
  readonly movie = input.required<Movie>();
  readonly isFavorite = input(false);

  // El hijo avisa al padre; es el padre quien decide qué hacer con la película
  readonly favoriteToggled = output<Movie>();

  toggleFavorite() {
    this.favoriteToggled.emit(this.movie());
  }
}
