import { Component, OnInit, inject, signal } from '@angular/core';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCardComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  private readonly movieService = inject(MovieService);

  protected readonly movies = signal<Movie[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly errorClass = 'error-message';

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error fetching movies:', err);
        this.error.set('No se pudieron cargar las películas. Inténtelo de nuevo más tarde.');
        this.isLoading.set(false);
      }
    });
  }
}
