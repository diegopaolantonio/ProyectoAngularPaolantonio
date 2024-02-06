import { Injectable } from '@angular/core';
import { UserInterface } from './models/index';
import { LoadingService } from '../../../../core/services/loading.service';
import { delay, finalize, of } from 'rxjs';

let users: UserInterface[] = [
  {
    dni: 11111111,
    firstName: 'Juan',
    lastName: 'Perez',
    email: 'juan@mail.com',
    password: '123456',
    role: 'Admin',
  },
  {
    dni: 22222222,
    firstName: 'Pedro',
    lastName: 'Martinez',
    email: 'pedro@mail.com',
    password: '123456',
    role: 'Alumno',
  },
  {
    dni: 33333333,
    firstName: 'Alberto',
    lastName: 'Gomez',
    email: 'alberto@mail.com',
    password: '123456',
    role: 'Profesor',
  },
  {
    dni: 44444444,
    firstName: 'Fernando',
    lastName: 'Vilca',
    email: 'fernando@mail.com',
    password: '123456',
    role: 'Alumno',
  },
  {
    dni: 55555555,
    firstName: 'Franco',
    lastName: 'Pereira',
    email: 'franco@mail.com',
    password: '123456',
    role: 'Profesor',
  },
];

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private loadingService: LoadingService) {}

  getUsers() {
    this.loadingService.setIsLoading(true);
    return of(users).pipe(
      delay(1500),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }

  createUser(user: UserInterface) {
    users = [...users, user];
    return this.getUsers();
  }

  updateUserById(dni: number, data: UserInterface) {
    users = users.map((element) =>
      element.dni === dni ? { ...element, ...data } : element
    );
    return this.getUsers();
  }

  deleteUserById(dni: number) {
    users = users.filter((element) => element.dni !== dni);
    return this.getUsers();
  }
}
