import { TestBed } from '@angular/core/testing';
import { UsersComponent } from './users.component';
import { MockProvider } from 'ng-mocks';
import { UsersService } from './users.service';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../../../core/store';
import { MatPaginatorModule } from '@angular/material/paginator';

describe('Pruebas de UsersComponent', () => {
  let usersComponent: UsersComponent;

  const usersResponse = {
    first: 1,
    prev: null,
    next: null,
    last: 1,
    pages: 1,
    items: 3,
    data: [
      {
        id: 'id1',
        dni: 1,
        email: 'Fake1@mail.com',
        firstName: 'FakeFirstName1',
        lastName: 'FakeLastName1',
        address: 'FakeAddress1',
        phone: '1',
        password: 'FakePassword1',
        profile: 'Admin',
        userToken: 'FakeToken1',
      },
      {
        id: 'id2',
        dni: 2,
        email: 'Fake2@mail.com',
        firstName: 'FakeFirstName2',
        lastName: 'FakeLastName2',
        address: 'FakeAddress2',
        phone: '2',
        password: 'FakePassword2',
        profile: 'Admin',
        userToken: 'FakeToken2',
      },
      {
        id: 'id3',
        dni: 3,
        email: 'Fake3@mail.com',
        firstName: 'FakeFirstName3',
        lastName: 'FakeLastName3',
        address: 'FakeAddress3',
        phone: '3',
        password: 'FakePassword3',
        profile: 'Admin',
        userToken: 'FakeToken3',
      },
    ],
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersComponent],
      providers: [
        MockProvider(UsersService, {
          getUsers: (page: 1, perPage: 10) => of(usersResponse),
        }),
      ],
      imports: [StoreModule.forRoot(appReducers, {}), MatPaginatorModule],
    });
    usersComponent = TestBed.createComponent(UsersComponent).componentInstance;
  });

  it('El component debe instanciarse correctamente', () => {
    expect(usersComponent).toBeTruthy();
  });

  it('El componente debe contener las propiedades "id", "dni", "email", "firstName", "lastName", "address", "phone", "password", "profile" y "userToken"', () => {
    expect(usersComponent.users[0].hasOwnProperty('id')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('dni')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('email')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('firstName')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('lastName')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('address')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('phone')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('password')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('profile')).toBeTrue();
    expect(usersComponent.users[0].hasOwnProperty('userToken')).toBeTrue();
  });

  it('Debe detecar que las propiedades de componente son: id: string, dni: number, email: string, firstName: string, lastName: string, address: string, phone: string, password: string, profile: string, userToken: string', () => {
    expect(typeof usersComponent.users[0].id).toBe('string');
    expect(typeof usersComponent.users[0].dni).toBe('number');
    expect(typeof usersComponent.users[0].email).toBe('string');
    expect(typeof usersComponent.users[0].firstName).toBe('string');
    expect(typeof usersComponent.users[0].lastName).toBe('string');
    expect(typeof usersComponent.users[0].address).toBe('string');
    expect(typeof usersComponent.users[0].phone).toBe('string');
    expect(typeof usersComponent.users[0].password).toBe('string');
    expect(typeof usersComponent.users[0].profile).toBe('string');
    expect(typeof usersComponent.users[0].userToken).toBe('string');
  });

  it('Debe detectar 3 usuarios cargados', () => {
    expect(usersComponent.users.length).toEqual(3);
  });

  it('Las columnas de la tabla de cursos deben ser (displayedColumns): "dni", "email", "fullName", "profile", "action"', () => {
    expect(usersComponent.displayedColumns).toContain('dni');
    expect(usersComponent.displayedColumns).toContain('email');
    expect(usersComponent.displayedColumns).toContain('fullName');
    expect(usersComponent.displayedColumns).toContain('profile');
    expect(usersComponent.displayedColumns).toContain('action');
  });
});
