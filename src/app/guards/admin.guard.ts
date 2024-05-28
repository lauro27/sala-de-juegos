import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../servicios/authentication.service';
import { inject } from '@angular/core';
import { take, map, tap } from 'rxjs';
export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  return authService.checkAdmin().pipe(
    tap(isAdmin => {
      if (!isAdmin) {
        router.navigate(['/home']);
      }
    }),
    map(isAdmin => isAdmin)
  );
};
