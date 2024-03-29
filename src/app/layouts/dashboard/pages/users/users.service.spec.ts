import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { UserInterface } from './models';
import { TestBed } from '@angular/core/testing';
import { Pagination } from '../../../../core/models/index';

describe('Pruebas de UsersService', () => {
  let usersService: UsersService;
  let httpController1: HttpTestingController;
  let httpController2: HttpTestingController;

  const FAKE_USERS_1: Pagination<UserInterface[]> = {
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 2,
    data: [
      {
        id: '1',
        dni: 1,
        firstName: 'FakeNombre1',
        lastName: 'FakeApellido1',
        address: 'FakeAddress1',
        phone: 'FakePhone1',
        email: 'fake1@mail.com',
        password: 'password1',
        profile: 'Admin',
        userToken: 'fakeToken1',
      },
      {
        id: '2',
        dni: 2,
        firstName: 'FakeNombre2',
        lastName: 'FakeApellido2',
        address: 'FakeAddress2',
        phone: 'FakePhone2',
        email: 'fake2@mail.com',
        password: 'password2',
        profile: 'Admin',
        userToken: 'fakeToken2',
      },
    ],
  };

  const FAKE_USERS_2: Pagination<UserInterface[]> = {
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 1,
    data: [
      {
        id: '1',
        dni: 1,
        firstName: 'FakeNombre1',
        lastName: 'FakeApellido1',
        address: 'FakeAddress1',
        phone: 'FakePhone1',
        email: 'fake1@mail.com',
        password: 'password1',
        profile: 'Admin',
        userToken: 'fakeToken1',
      },
    ],
  };

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
    usersService.getUsers(1, 10).subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS_1);
        expect(users.data.length).toBe(2);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/users?_page=1&_per_page=10',
        method: 'GET',
      })
      .flush(FAKE_USERS_1);
  });

  it('El createUser() debe llamar al metodo POST, luego al GET y devolver el usuario de prueba nro 1', () => {
    usersService.createUser(FAKE_USERS_1.data[0], 1, 10).subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS_2);
        expect(users.data.length).toBe(1);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/users',
        method: 'POST',
      })
      .flush(FAKE_USERS_1.data);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/users?_page=1&_per_page=10',
        method: 'GET',
      })
      .flush(FAKE_USERS_2);
  });

  it('El updateUserById() debe llamar al metodo PUT, luego al GET y devolver los 2 usuarios de prueba', () => {
    usersService.updateUserById('1', FAKE_USERS_1.data[0], 1, 10).subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS_1);
        expect(users.data.length).toBe(2);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/users/1',
        method: 'PUT',
      })
      .flush(FAKE_USERS_1.data[0]);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/users?_page=1&_per_page=10',
        method: 'GET',
      })
      .flush(FAKE_USERS_1);
  });

  it('El deleteUserById() debe llamar al metodo DELETE, luego al GET y devolver el usuario de prueba nro 1', () => {
    usersService.deleteUserById('2', 1, 10).subscribe({
      next: (users) => {
        expect(users).toEqual(FAKE_USERS_2);
        expect(users.data.length).toBe(1);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/users/2',
        method: 'DELETE',
      })
      .flush(FAKE_USERS_1.data[1]);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/users?_page=1&_per_page=10',
        method: 'GET',
      })
      .flush(FAKE_USERS_2);
  });
});
