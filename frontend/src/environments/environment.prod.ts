// Variables de entorno — producción (reemplaza a environment.ts en el build de producción).
// En un proyecto real la API key vendría del pipeline de CI/CD, no del repo.
export const environment = {
  production: true,
  tmdbApiUrl: 'https://api.themoviedb.org/3',
  tmdbApiKey: '36eb10aa56ea823b1b3c7370a05aeb09',
  tmdbImageBaseUrl: 'https://image.tmdb.org/t/p/w500',
};
