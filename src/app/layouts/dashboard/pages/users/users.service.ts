import { Injectable } from '@angular/core';
import { UserInterface } from './models/index';
import { LoadingService } from '../../../../core/services/loading.service';
import { catchError, delay, finalize, mergeMap, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

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

  getUsers() {
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

  createUser(user: UserInterface) {
    return this.httpClient
      .post<UserInterface>(`${environment.apiURL}/users`, {
        ...user,
        userToken: this.generateToken(15),
      })
      .pipe(
        mergeMap(() => this.getUsers()),
        // delay(1000),
        catchError((error) => {
          alert(`Error al crear el usuario, ${error.statusText}`);
          return of([]);
        })
      );
  }

  updateUserById(id: string, data: UserInterface) {
    return this.httpClient
      .put<UserInterface>(`${environment.apiURL}/users/${id}`, data)
      .pipe(
        mergeMap(() => this.getUsers()),
        // delay(1000),
        catchError((error) => {
          alert(`Error al actualizar el usuario, ${error.statusText}`);
          return of([]);
        })
      );
  }

  deleteUserById(id: string) {
    return this.httpClient
      .delete<UserInterface>(`${environment.apiURL}/users/${id}`)
      .pipe(
        mergeMap(() => this.getUsers()),
        // delay(1000),
        catchError((error) => {
          alert(`Error al eliminar el usuario, ${error.statusText}`);
          return of([]);
        })
      );
  }
}
