import { Injectable } from '@angular/core';
import { UserInterface } from '../dashboard/pages/users/models';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import { Observable, delay, finalize, map, of, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: UserInterface | null = null;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  private setAuthUser(user: UserInterface): void {
    this.authUser = user;
    localStorage.setItem('user_Token', user.userToken);
  }

  login(data: LoginData): Observable<UserInterface[]> {
    return this.httpClient
      .get<UserInterface[]>(
        `${environment.apiURL}/users?email=${data.email}&password=${data.password}`
      )
      .pipe(
        tap((response) => {
          if (!!response[0]) {
            this.setAuthUser(response[0]);
            this.router.navigate(['dashboard', 'home']);
          } else {
            alert('Email o password invalidos');
          }
        })
      );
  }

  logout(): void {
    this.authUser = null;
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
            this.authUser = null;
            localStorage.removeItem('user_Token');
            return false;
          }
        }),
        finalize(() => this.loadingService.setIsLoading(false))
      );
  }
}
