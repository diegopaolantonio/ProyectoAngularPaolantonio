import { Injectable } from '@angular/core';
import { UserInterface } from './models/index';
import { LoadingService } from '../../../../core/services/loading.service';
import { catchError, delay, finalize, mergeMap, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Pagination } from '../../../../core/models/index';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  generateToken(length: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getAllUsers() {
    this.loadingService.setIsLoading(true);

    return this.httpClient
      .get<UserInterface[]>(`${environment.apiURL}/users`)
      .pipe(
        // delay(1000),
        finalize(() => {
          this.loadingService.setIsLoading(false);
        }),
        catchError((error) => {
          alert(`Error al cargar los usuarios, ${error.statusText}`);
          return of([]);
        })
      );
  }

  getUsers(page: number, perPage: number) {
    this.loadingService.setIsLoading(true);

    return this.httpClient
      .get<Pagination<UserInterface[]>>(
        `${environment.apiURL}/users?_page=${page}&_per_page=${perPage}`
      )
      .pipe(
        // delay(1000),
        finalize(() => {
          this.loadingService.setIsLoading(false);
        }),
        catchError((error) => {
          alert(`Error al cargar los usuarios, ${error.statusText}`);
          return of({
            first: 0,
            prev: null,
            next: null,
            last: 0,
            pages: 0,
            items: 0,
            data: [],
          });
        })
      );
  }

  createUser(user: UserInterface, page: number, perPage: number) {
    return this.httpClient
      .post<UserInterface>(`${environment.apiURL}/users`, {
        ...user,
        userToken: this.generateToken(15),
      })
      .pipe(
        mergeMap(() => this.getUsers(page, perPage)),
        // delay(1000),
        catchError((error) => {
          alert(`Error al crear el usuario, ${error.statusText}`);
          return of({
            first: 0,
            prev: null,
            next: null,
            last: 0,
            pages: 0,
            items: 0,
            data: [],
          });
        })
      );
  }

  updateUserById(
    id: string,
    data: UserInterface,
    page: number,
    perPage: number
  ) {
    return this.httpClient
      .put<UserInterface>(`${environment.apiURL}/users/${id}`, data)
      .pipe(
        mergeMap(() => this.getUsers(page, perPage)),
        // delay(1000),
        catchError((error) => {
          alert(`Error al actualizar el usuario, ${error.statusText}`);
          return of({
            first: 0,
            prev: null,
            next: null,
            last: 0,
            pages: 0,
            items: 0,
            data: [],
          });
        })
      );
  }

  deleteUserById(id: string, page: number, perPage: number) {
    return this.httpClient
      .delete<UserInterface>(`${environment.apiURL}/users/${id}`)
      .pipe(
        mergeMap(() => this.getUsers(page, perPage)),
        // delay(1000),
        catchError((error) => {
          alert(`Error al eliminar el usuario, ${error.statusText}`);
          return of({
            first: 0,
            prev: null,
            next: null,
            last: 0,
            pages: 0,
            items: 0,
            data: [],
          });
        })
      );
  }
}
