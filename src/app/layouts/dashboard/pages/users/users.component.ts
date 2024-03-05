import { Component } from '@angular/core';
import { UserInterface } from './models/index';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import Swal from 'sweetalert2';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { Store } from '@ngrx/store';
import { DashboardActions } from '../../store/dashboard.actions';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  dniExists: boolean = false;

  displayedColumns: string[] = [
    'dni',
    'email',
    'fullName',
    'profile',
    'action',
  ];

  users: UserInterface[] = [];

  constructor(
    private usersService: UsersService,
    public matDialog: MatDialog,
    private store: Store
  ) {
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
    });

    this.store.dispatch(DashboardActions.activeSection({ tittle: 'Usuarios' }));
  }

  onCreate(): void {
    this.matDialog
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
    this.matDialog
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

  onView(user: UserInterface) {
    this.matDialog
      .open(UserDetailComponent, {
        data: user.id,
      })
      .afterClosed()
      .subscribe({
        next: () =>
          this.usersService.getUsers().subscribe({
            next: (users) => {
              this.users = users;
            },
          }),
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
