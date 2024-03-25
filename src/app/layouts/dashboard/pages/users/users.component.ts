import { Component, EventEmitter } from '@angular/core';
import { UserInterface } from './models/index';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './components/user-form/user-form.component';
import Swal from 'sweetalert2';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { Store } from '@ngrx/store';
import { DashboardActions } from '../../store/dashboard.actions';
import { PageEvent } from '@angular/material/paginator';
import { Pagination } from '../../../../core/models/index';

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
  totalItems = 0;
  pageSize = 5;
  currentPage = 1;

  constructor(
    private usersService: UsersService,
    public matDialog: MatDialog,
    private store: Store
  ) {
    this.getPageData();
    this.store.dispatch(DashboardActions.activeSection({ tittle: 'Usuarios' }));
  }

  ngOnInit(): void {
    this.getPageData();
  }

  getPageData(): void {
    this.usersService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (paginationResult: Pagination<UserInterface[]>) => {
        this.totalItems = paginationResult.items;
        this.users = paginationResult.data;
      },
    });
  }

  onPage(ev: PageEvent) {
    this.currentPage = ev.pageIndex + 1;
    this.pageSize = ev.pageSize;
    this.usersService.getUsers(this.currentPage, this.pageSize).subscribe({
      next: (paginateResult: Pagination<UserInterface[]>) => {
        this.totalItems = paginateResult.items;
        this.users = paginateResult.data;
      },
    });
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
              this.usersService
                .createUser(user, this.currentPage, this.pageSize)
                .subscribe({
                  next: (users) => {
                    this.users = users.data;
                    Swal.fire({
                      icon: 'success',
                      title: 'Usuario creado',
                    }).finally(() => location.reload());
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
            this.usersService
              .updateUserById(user.id, result, this.currentPage, this.pageSize)
              .subscribe({
                next: (users) => {
                  this.users = users.data;
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
        data: [user.id, this.currentPage, this.pageSize],
      })
      .afterClosed()
      .subscribe({
        next: () =>
          this.usersService
            .getUsers(this.currentPage, this.pageSize)
            .subscribe({
              next: (users) => {
                this.users = users.data;
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
        this.usersService
          .deleteUserById(id, this.currentPage, this.pageSize)
          .subscribe({
            next: (users) => {
              this.users = users.data;
              Swal.fire({
                title: 'Usuario eliminado!',
                icon: 'success',
              }).finally(() => location.reload());
            },
          });
      }
    });
  }
}
