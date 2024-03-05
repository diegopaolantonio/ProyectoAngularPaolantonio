import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterface } from '../users/models';
import { Store } from '@ngrx/store';
import { selectLoginUser } from '../../../auth/pages/login/store/login.selectors';
import { DashboardActions } from '../../store/dashboard.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  loginUser$: Observable<UserInterface | null>;

  constructor(private store: Store) {
    this.loginUser$ = this.store.select(selectLoginUser);
    this.store.dispatch(DashboardActions.activeSection({ tittle: 'Inicio' }));
  }
}
