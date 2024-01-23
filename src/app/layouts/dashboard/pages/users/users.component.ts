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
  dataSource: UserInterface[] = [];
  tempUser: UserInterface[] = [];
  hide = true;
  hideEdit = false;
  userEdit: UserInterface = {
    dni: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: '',
  };
  userEditIndex: number = 0;

  onUserAdded(ev: UserInterface): void {
    this.dataSource = [...this.dataSource, { ...ev }];
  }

  deleteUser(userDni: string) {
    const tempUsers: UserInterface[] = this.dataSource.filter(
      (element) => element.dni != userDni
    );
    this.dataSource = [...tempUsers];
  }

  editUserFunc(user: UserInterface, j: number) {
    console.log(this.userEdit);
    this.userEdit = { ...user };
    this.userEditIndex = j;
    this.hideEdit = !this.hideEdit;
  }

  cancelEditUser() {
    this.userEdit = {
      dni: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: '',
    };
    this.userEditIndex = 0;
    this.hideEdit = !this.hideEdit;
  }

  updateUser() {
    this.dataSource[this.userEditIndex] = { ...this.userEdit };
    this.hideEdit = !this.hideEdit;
  }
}
