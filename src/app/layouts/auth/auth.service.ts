import { Injectable } from '@angular/core';
import { UserInterface } from '../dashboard/pages/users/models';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import { Observable, delay, finalize, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { LoginActions } from './pages/login/store/login.actions';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private httpClient: HttpClient,
    private store: Store
  ) {}

  private setAuthUser(user: UserInterface): void {
    this.store.dispatch(LoginActions.loadLogin({ user }));
    localStorage.setItem('user_Token', user.userToken);
  }

  login(data: LoginData): Observable<UserInterface[]> {
    return this.httpClient
      .get<UserInterface[]>(
        `${environment.apiURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        tap((response) => {
          this.setAuthUser(response[0]);
          if (!!response[0] && response[0].userToken !== 'fakeToken') {
            this.router.navigate(['dashboard', 'home']);
          }
        })
      );
  }

  logout(): void {
    this.store.dispatch(LoginActions.logoutLogin());
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('user_Token');
  }

  verifyToken() {
    this.loadingService.setIsLoading(true);
    return this.httpClient
      .get<UserInterface[]>(
        `${environment.apiURL}/users?userToken=${localStorage.getItem(
          'user_Token'
        )}`
      )
      .pipe(
        map((response) => {
          if (response.length) {
            this.setAuthUser(response[0]);
            return true;
          } else {
            this.store.dispatch(LoginActions.logoutLogin());
            localStorage.removeItem('user_Token');
            return false;
          }
        }),
        finalize(() => this.loadingService.setIsLoading(false))
      );
  }
}
