import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../servicios/authentication.service';
import { inject } from '@angular/core';
import { take, map, tap, switchMap, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  console.log("checking if not logged");
  return authService.user$.pipe(
    take(1),
    map(estaLogeado => !! estaLogeado),
    tap(login => console.log(login)),
    switchMap(loggedIn => {
      if (!loggedIn) {
        console.log("should redirect to login");
        return router.navigateByUrl('/login').then(() => false);
      }
      return of(true);
    })
  );
};
