import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router'; // Para acceder a los parámetros de ruta y routerLink
import { EMPTY, switchMap } from 'rxjs';
import { Movie } from '../../models/movie.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-movie-details',
  imports: [RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent implements OnInit {
  private readonly route = inject(ActivatedRoute); // Para obtener parámetros de la URL
  private readonly movieService = inject(MovieService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly movie = signal<Movie | undefined>(undefined);
  protected readonly isLoading = signal(true);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const movieId = Number(params.get('id'));
        if (!Number.isInteger(movieId) || movieId <= 0) {
          this.error.set('ID de película inválido.');
          this.isLoading.set(false);
          return EMPTY; // Observable vacío para no continuar
        }
        this.isLoading.set(true);
        this.error.set(null);
        return this.movieService.getMovieById(movieId);
      }),
      // paramMap no se completa solo: cortamos la suscripción cuando se destruye el componente
      takeUntilDestroyed(this.destroyRef)
    ).subscribe({
      next: (data) => {
        this.movie.set(data);
        this.isLoading.set(false);
        if (!data) {
          this.error.set('Película no encontrada.');
        }
      },
      error: (err) => {
        console.error('Error fetching movie details:', err);
        this.error.set('No se pudieron cargar los detalles de la película. Inténtelo de nuevo más tarde.');
        this.isLoading.set(false);
      }
    });
  }
}
