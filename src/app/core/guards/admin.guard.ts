import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectLoginUser } from '../../layouts/auth/pages/login/store/login.selectors';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectLoginUser).pipe(
    map((user) => {
      return user?.profile.toUpperCase() === 'ADMIN'
        ? true
        : router.createUrlTree(['dashboard', 'home']);
    })
  );
};
