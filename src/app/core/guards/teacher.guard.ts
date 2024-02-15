import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';

export const teacherGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.authUser?.role.toUpperCase() === 'PROFESOR' ||
    authService.authUser?.role.toUpperCase() === 'ADMIN'
    ? true
    : router.createUrlTree(['dashboard', 'home']);
};
