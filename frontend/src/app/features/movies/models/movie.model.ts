export interface Movie {
  id: number;
  title: string;
  overview: string;
  original_language: string;
  poster_path: string | null;
  release_date: string;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
}
