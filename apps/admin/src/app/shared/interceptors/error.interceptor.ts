import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) {
        toastr.error('Sessão expirada. Faça login novamente.');
        router.navigate(['/login']);
      } else {
        const message = (error.error && (error.error.message || error.error.error)) || 'Ocorreu um erro inesperado.';
        toastr.error(message);
      }
      return throwError(() => error);
    })
  );
};
