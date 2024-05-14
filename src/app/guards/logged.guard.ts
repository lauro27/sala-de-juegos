import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthenticationService } from '../servicios/authentication.service';

export const loggedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  return (authService.currentUserSig() == null);
};
