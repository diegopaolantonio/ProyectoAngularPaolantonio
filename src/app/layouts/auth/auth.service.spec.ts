import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { UserInterface } from '../dashboard/pages/users/models';
import { appReducers } from '../../core/store';

describe('Pruebas de AuthService', () => {
  let authService: AuthService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService],
      imports: [HttpClientTestingModule, StoreModule.forRoot(appReducers, {})],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe instanciarse correctamente', () => {
    expect(authService).toBeTruthy();
  });

  it('El login() debe establecer un usuario mock y generar un mock token en el local storage', () => {
    const FAKE_USER: UserInterface[] = [
      {
        id: '1',
        dni: 0,
        firstName: 'FakeNombre',
        lastName: 'FakeApellido',
        email: 'fake@mail.com',
        address: 'FakeAddress',
        phone: '12',
        password: 'password',
        profile: 'Admin',
        userToken: 'fakeToken',
      },
    ];

    authService
      .login({ email: 'fake@mail.com', password: 'password' })
      .subscribe({
        next: () => {
          const mockToken = localStorage.getItem('user_Token');

          expect(mockToken).toEqual(FAKE_USER[0].userToken);
          localStorage.removeItem('user_Token');
        },
      });

    httpController
      .expectOne({
        url: 'http://localhost:3000/users?email=fake@mail.com&password=password',
        method: 'GET',
      })
      .flush(FAKE_USER);
  });
});
