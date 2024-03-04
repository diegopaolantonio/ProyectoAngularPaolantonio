import { Component } from '@angular/core';
import { UserInterface } from './models/index';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  dniExists: boolean = false;

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
          this.dniExists = false;
          this.users.forEach((element) => {
            if (element.dni === user.dni) this.dniExists = true;
          });
          if (user) {
            if (!this.dniExists) {
              this.usersService.createUser(user).subscribe({
                next: (users) => {
                  this.users = users;
                  Swal.fire({
                    icon: 'success',
                    title: 'Usuario creado',
                  });
                },
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'El DNI cargado ya existe en la BD',
              });
            }
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
            this.usersService.updateUserById(user.id, result).subscribe({
              next: (users) => {
                this.users = users;
                Swal.fire({
                  icon: 'success',
                  title: 'Usuario modificado',
                });
              },
            });
          }
        },
      });
  }

  onDelete(id: string) {
    Swal.fire({
      title: 'Esta seguro de eliminar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUserById(id).subscribe({
          next: (users) => {
            this.users = users;
            Swal.fire({
              title: 'Usuario eliminado!',
              icon: 'success',
            });
          },
        });
      }
    });
  }
}
