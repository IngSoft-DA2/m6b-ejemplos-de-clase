import { inject } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../features/auth/services/auth.service';

// Interceptor funcional (HttpInterceptorFn): se ejecuta en cada request HTTP saliente,
// así los services no tienen que agregar el header Authorization a mano.
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).getToken();

  // Sin sesión activa el request sale tal cual
  if (!token) {
    return next(req);
  }

  // Los HttpRequest son inmutables: se clona con el header agregado
  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
