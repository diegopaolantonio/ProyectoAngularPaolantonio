import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import { UserInterface } from './pages/users/models';
import { Store } from '@ngrx/store';
import { selectLoginUser } from '../auth/pages/login/store/login.selectors';
import { selectActiveSection } from './store/dashboard.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  fecha = new Date();

  loginUser$: Observable<UserInterface | null>;
  adminUser: boolean = false;

  tittle$: Observable<string>;

  constructor(private authService: AuthService, private store: Store) {
    this.loginUser$ = this.store.select(selectLoginUser);

    this.loginUser$.subscribe({
      next: (user) =>
        user?.profile.toUpperCase() === 'ADMIN'
          ? (this.adminUser = true)
          : (this.adminUser = false),
    });

    this.tittle$ = this.store.select(selectActiveSection);
  }

  onLogout() {
    this.authService.logout();
  }
}
