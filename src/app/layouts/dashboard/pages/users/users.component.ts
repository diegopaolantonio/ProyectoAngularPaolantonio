import { Component } from '@angular/core';
import { UserInterface } from './models/index';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './component/user-form/user-form.component';

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

  users: UserInterface[] = [];

  constructor(private usersService: UsersService, public dialog: MatDialog) {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }

  onCreate(): void {
    this.dialog
      .open(UserFormComponent)
      .afterClosed()
      .subscribe({
        next: (user) => {
          if (user) {
            this.usersService.createUser(user).subscribe({
              next: (users) => (this.users = users),
            });
          }
        },
      });
  }

  onEdit(user: UserInterface) {
    this.dialog
      .open(UserFormComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.usersService.updateUserById(user.dni, result).subscribe({
              next: (users) => (this.users = users),
            });
          }
        },
      });
  }

  onDelete(dni: number) {
    this.usersService.deleteUserById(dni).subscribe({
      next: (users) => {
        this.users = users;
      },
    });
  }
}
