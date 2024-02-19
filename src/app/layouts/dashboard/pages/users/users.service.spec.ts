import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { UserInterface } from './models';
import { TestBed } from '@angular/core/testing';

describe('Pruebas de UsersService', () => {
  let usersService: UsersService;
  let httpController1: HttpTestingController;
  let httpController2: HttpTestingController;

  const FAKE_USERS_1: UserInterface[] = [
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

  const FAKE_USERS_2: UserInterface[] = [
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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsersService],
      imports: [HttpClientTestingModule],
    });

    usersService = TestBed.inject(UsersService);
    httpController1 = TestBed.inject(HttpTestingController);
    httpController2 = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe instanciarse correctamente', () => {
    expect(usersService).toBeTruthy();
  });

  it('El getUsers() debe llamar al metodo GET y traer los 2 usuarios de prueba', () => {
    usersService.getUsers().subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS_1);
        expect(users.length).toBe(2);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/users',
        method: 'GET',
      })
      .flush(FAKE_USERS_1);
  });

  it('El createUser() debe llamar al metodo POST, luego al GET y devolver el usuario de prueba nro 1', () => {
    usersService.createUser(FAKE_USERS_1[0]).subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS_2);
        expect(users.length).toBe(1);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/users',
        method: 'POST',
      })
      .flush(FAKE_USERS_1);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/users',
        method: 'GET',
      })
      .flush(FAKE_USERS_2);
  });

  it('El updateUserById() debe llamar al metodo PUT, luego al GET y devolver los 2 usuarios de prueba', () => {
    usersService.updateUserById('1', FAKE_USERS_1[0]).subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS_1);
        expect(users.length).toBe(2);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/users/1',
        method: 'PUT',
      })
      .flush(FAKE_USERS_1[0]);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/users',
        method: 'GET',
      })
      .flush(FAKE_USERS_1);
  });

  it('El deleteUserById() debe llamar al metodo DELETE, luego al GET y devolver el usuario de prueba nro 1', () => {
    usersService.deleteUserById('2').subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS_2);
        expect(users.length).toBe(1);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/users/2',
        method: 'DELETE',
      })
      .flush(FAKE_USERS_1[1]);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/users',
        method: 'GET',
      })
      .flush(FAKE_USERS_2);
  });
});
