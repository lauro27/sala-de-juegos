import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../servicios/authentication.service';
import { take, map, tap, switchMap, of } from 'rxjs';

export const loggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  console.log("checking if logged");
  return authService.user$.pipe(
    take(1),
    map(estaLogeado => !! estaLogeado),
    tap(login => console.log(login)),
    switchMap(loggedIn => {
      console.log("loggedin: " + loggedIn);
      if (loggedIn) {
        console.log("should redirect to home");
        return router.navigateByUrl('/home').then(() => false);
      }
      console.log("should get through");
      return of(true);
    })
  );
};
