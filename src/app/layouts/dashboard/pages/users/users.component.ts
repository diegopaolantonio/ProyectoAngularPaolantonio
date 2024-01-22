import { Component, EventEmitter, Output } from '@angular/core';
import { UserInterface } from './models';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  displayedColumns: string[] = ['dni', 'fullName', 'email', 'password', 'role', 'action'];
  dataSource: UserInterface[] = [];
  tempUser: UserInterface[] = [];

  @Output()
  userEdited = new EventEmitter();

  onUserAdded(ev: UserInterface): void {
    this.dataSource = [...this.dataSource, { ...ev }];
  }

  deleteUser(userDni: string) {
    const tempUsers: UserInterface[] = this.dataSource.filter((element) => element.dni != userDni);
    this.dataSource = [...tempUsers];
  }

  editUser(userDni: string) {
    this.tempUser = this.dataSource.filter((element) => element.dni === userDni);
    // console.log(this.tempUser);
    this.userEdited.emit(this.tempUser);
  }

}
