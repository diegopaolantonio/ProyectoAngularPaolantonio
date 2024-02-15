import { Injectable } from '@angular/core';
import { UserInterface } from '../dashboard/pages/users/models';
import { Router } from '@angular/router';
import { LoadingService } from '../../core/services/loading.service';
import { delay, finalize, map, of, tap } from 'rxjs';
import { UsersService } from '../dashboard/pages/users/users.service';

interface LoginData {
  email: null | string;
  password: null | string;
}

const MOCK_USER = {
  id: '0',
  dni: 0,
  email: 'asd@mail.com',
  firstName: 'Nombre Falso',
  lastName: 'Apellido Falso',
  password: 'asdasd',
  role: 'Profesor',
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authUser: UserInterface | null = null;

  constructor(private router: Router, private loadingService: LoadingService) {}

  private setAuthUser(testUser: UserInterface): void {
    this.authUser = testUser;
    localStorage.setItem('userToken', 'gj234g2gh4j234hjg223b4m2');
  }

  login(data: LoginData): void {
    if (
      data.email === MOCK_USER.email &&
      data.password === MOCK_USER.password
    ) {
      this.setAuthUser(MOCK_USER);
      this.router.navigate(['dashboard', 'home']);
    }
  }

  logout(): void {
    this.authUser = null;
    this.router.navigate(['auth', 'login']);
    localStorage.removeItem('userToken');
  }

  verifyToken() {
    this.loadingService.setIsLoading(true);
    return of(localStorage.getItem('userToken')).pipe(
      delay(1000),
      map((response) => !!response),
      tap(() => {
        if (localStorage.getItem('userToken')) this.setAuthUser(MOCK_USER);
      }),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }
}
