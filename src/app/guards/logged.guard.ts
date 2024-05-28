import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../servicios/authentication.service';
import { take, map, tap } from 'rxjs';

export const loggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  console.log("checking if logged");
  return authService.user$.pipe(
    take(1),
    map(estaLogeado => !! estaLogeado),
    tap(login => console.log(login)),
    map(loggedIn => {
      console.log("loggedin: " + loggedIn);
      if (loggedIn) {
        console.log("should redirect to home");
        router.navigateByUrl('/home');
        return false;
      }
      console.log("should get through");
      return true;
    })
  );
};
