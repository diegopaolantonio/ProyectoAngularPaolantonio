import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserInterface } from '../../models';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../../environments/environment';
import { UserFormComponent } from '../user-form/user-form.component';
import { UsersService } from '../../users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent {
  user$: Observable<UserInterface[]>;
  user: UserInterface = {
    id: '',
    dni: 0,
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    password: '',
    profile: '',
    userToken: '',
  };
  viewUserId: string;
  currentPage: number;
  pageSize: number;

  constructor(
    private usersService: UsersService,
    private httpClient: HttpClient,
    private matDialog: MatDialog,
    private matDialogRef: MatDialogRef<UserDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Array<any>
  ) {
    this.viewUserId = data[0];
    this.currentPage = data[1];
    this.pageSize = data[2];
    this.user$ = this.httpClient.get<UserInterface[]>(
      `${environment.apiURL}/users?id=${this.viewUserId}`
    );
    this.user$.subscribe({
      next: (response) => {
        this.user = response[0];
      },
    });
  }

  onUpdate(user: UserInterface): void {
    this.matDialog
      .open(UserFormComponent, {
        data: user,
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (result) {
            this.usersService
              .updateUserById(user.id, result, this.currentPage, this.pageSize)
              .subscribe({
                next: (users) => {
                  Swal.fire({
                    icon: 'success',
                    title: 'Usuario modificado',
                  }).then(() => {
                    this.matDialogRef.close(users);
                  });
                },
              });
          }
        },
      });
  }

  onDelete(userId: string): void {
    Swal.fire({
      title: 'Esta seguro de eliminar el usuario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService
          .deleteUserById(userId, this.currentPage, this.pageSize)
          .subscribe({
            next: (users) => {
              Swal.fire({ title: 'Usuario eliminado!', icon: 'success' }).then(
                () => {
                  this.matDialogRef.close(users);
                  location.reload();
                }
              );
            },
          });
      }
    });
  }
}
