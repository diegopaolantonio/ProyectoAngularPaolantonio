import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from './models/index';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  displayedColumns: string[] = [
    'dni',
    'fullName',
    'email',
    'password',
    'role',
    'action',
  ];
  dataSource: UserInterface[] = [{
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
  tempUser: UserInterface[] = [];
  hide = true;
  hideEdit = true;
  hideAdd = true;
  userEdit: UserInterface = {
    dni: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  };
  userEditIndex: number = 0;

  onUserAdded(ev: UserInterface): void {
    this.dataSource = [...this.dataSource, { ...ev }];
    this.hideAdd = true;
  }

  onCancelAdded(ev: boolean): void {
    if (ev) {
      this.hideAdd = true
    }
  }

  deleteUser(userDni: number) {
    const tempUsers: UserInterface[] = this.dataSource.filter(
      (element) => element.dni != userDni
    );
    this.dataSource = [...tempUsers];
  }

  editUserFunc(user: UserInterface, j: number) {
    this.userEdit = { ...user };
    this.userEditIndex = j;
    this.hideEdit = false;
    this.hideAdd =  true;
  }

  cancelEditUser() {
    this.userEdit = {
      dni: 0,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    };
    this.userEditIndex = 0;
    this.hideEdit = !this.hideEdit;
  }

  botonForm() {
    this.hideAdd = false;
    this.hideEdit = true;
  }

  updateUser() {
    this.dataSource[this.userEditIndex] = { ...this.userEdit };
    this.hideEdit = !this.hideEdit;
  }
}
