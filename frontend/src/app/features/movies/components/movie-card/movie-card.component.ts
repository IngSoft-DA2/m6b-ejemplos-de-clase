import { Component, OnChanges, OnInit, SimpleChanges, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.css'
})
export class MovieCardComponent implements OnChanges, OnInit {
  readonly movie = input.required<Movie>();
  readonly movieSelected = output<Movie>();

  ngOnChanges(changes: SimpleChanges): void {
    console.log('MovieCardComponent - ngOnChanges ejecutado');

    if (changes['movie']) {
      const currentMovie = changes['movie'].currentValue;
      const previousMovie = changes['movie'].previousValue;


      if (currentMovie && previousMovie && currentMovie.id !== previousMovie.id) {
        console.log(`     ¡El ID de la película ha cambiado de ${previousMovie.id} a ${currentMovie.id}!`);
      } else if (currentMovie && !previousMovie) {
        console.log('     Primera asignación de la película.');
      }
    } else {
      console.log('  -> Otra propiedad de entrada (no "movie") ha cambiado.');
    }
  }

  ngOnInit(): void {
    console.log('MovieCardComponent - ngOnInit ejecutado: movie is', this.movie().title);
  }

  onMovieClick(): void {
    this.movieSelected.emit(this.movie());
  }
}
