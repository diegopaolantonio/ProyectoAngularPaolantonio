import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { UserInterface } from './models';
import { TestBed } from '@angular/core/testing';
import { catchError, map } from 'rxjs';

describe('Pruebas de UsersService', () => {
  let usersService: UsersService;
  let httpController: HttpTestingController;

  const FAKE_USERS: UserInterface[] = [
    {
      id: '1',
      dni: 1,
      firstName: 'FakeNombre1',
      lastName: 'FakeApellido1',
      email: 'fake1@mail.com',
      password: 'password1',
      role: 'Admin',
      userToken: 'fakeToken1',
    },
    {
      id: '2',
      dni: 2,
      firstName: 'FakeNombre2',
      lastName: 'FakeApellido2',
      email: 'fake2@mail.com',
      password: 'password2',
      role: 'Admin',
      userToken: 'fakeToken2',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule],
    });

    usersService = TestBed.inject(UsersService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe instanciarse correctamente', () => {
    expect(usersService).toBeTruthy();
  });

  it('El getUsers() debe traer los usuarios de prueba', async () => {
    usersService.getUsers().subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS);
        expect(users.length).toBe(2);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/users',
        method: 'GET',
      })
      .flush(FAKE_USERS);
  });
});
