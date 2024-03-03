import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { UserInterface } from './pages/users/models';
import { Store } from '@ngrx/store';
import { selectLoginUser } from '../auth/pages/login/store/login.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  fecha = new Date();

  loginUser$: Observable<UserInterface | null>;

  constructor(private authService: AuthService, private store: Store) {
    this.loginUser$ = this.store.select(selectLoginUser);
  }

  onLogout() {
    this.authService.logout();
  }
}
