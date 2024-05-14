import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../servicios/authentication.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  let loggedIn = authService.currentUserSig() != null;
  if(!loggedIn){
    router.navigate(['/login']);
  }
  console.log(authService.currentUserSig());
  return loggedIn;
};
