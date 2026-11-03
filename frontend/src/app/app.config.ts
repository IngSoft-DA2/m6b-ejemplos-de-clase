import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    // withInterceptors registra los interceptors, que se ejecutan en orden en cada request
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    // Permite recibir los parámetros de la ruta (ej: :id) como input() en el componente
    provideRouter(routes, withComponentInputBinding()),
  ],
};
