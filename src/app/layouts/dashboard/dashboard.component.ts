import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable, catchError, of, throwError } from 'rxjs';
import { UserInterface } from './pages/users/models';
import { Store } from '@ngrx/store';
import { selectLoginUser } from '../auth/pages/login/store/login.selectors';
import { selectActiveSection } from './store/dashboard.selectors';
import { LoadingService } from '../../core/services/loading.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dataLoadingDone: boolean = false;
  fecha = new Date();

  loginUser$: Observable<UserInterface | null>;
  adminUser: boolean = false;
  userUser: boolean = false;

  tittle$: Observable<string>;
  tittle: String | null = null;

  constructor(private authService: AuthService, private store: Store) {
    // this.dataLoadingDone = false;
    this.loginUser$ = this.store.select(selectLoginUser);

    this.loginUser$.subscribe({
      next: (user) => {
        user?.profile.toUpperCase() === 'ADMIN'
          ? (this.adminUser = true)
          : (this.adminUser = false),
          user?.profile.toUpperCase() === 'ADMIN' ||
          user?.profile.toUpperCase() === 'USER'
            ? (this.userUser = true)
            : (this.userUser = false);
      },
    });

    this.tittle$ = this.store.select(selectActiveSection);

    this.tittle$.subscribe({
      next: (tittle) => (this.tittle = tittle.toUpperCase()),
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.dataLoadingDone = true;
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
