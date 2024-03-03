import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  InscriptionInterface,
  CreateInscriptionInterface,
} from './models/index';
import { environment } from '../../../../../environments/environment';
import { UserInterface } from '../users/models';
import { catchError, concatMap, throwError } from 'rxjs';
import { CourseInterface } from '../courses/models';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  constructor(private httpClient: HttpClient) {}

  getInscriptions() {
    return this.httpClient.get<InscriptionInterface[]>(
      `${environment.apiURL}/inscriptions?_embed=user&_embed=course`
    );
  }

  getInscriptionsByUserId(userId: string) {
    return this.httpClient
      .get<UserInterface>(`${environment.apiURL}/users/${userId}`)
      .pipe(
        concatMap((user) =>
          this.httpClient.get(
            `${environment.apiURL}/inscriptions?userId=${user.id}`
          )
        ),
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  getInscriptionsByCourseId(courseId: string) {
    return this.httpClient
      .get<CourseInterface>(`${environment.apiURL}/courses/${courseId}`)
      .pipe(
        concatMap((course) =>
          this.httpClient.get(
            `${environment.apiURL}/inscriptions?courseId=${course.id}`
          )
        ),
        catchError((error) => {
          console.log(error);
          return throwError(() => error);
        })
      );
  }

  postInscription(inscription: CreateInscriptionInterface) {
    return this.httpClient.post<InscriptionInterface>(
      `${environment.apiURL}/inscriptions`,
      inscription
    );
  }

  deleteInscriptionById(inscriptionId: string) {
    return this.httpClient.delete<InscriptionInterface>(
      `${environment.apiURL}/inscriptions/${inscriptionId}`
    );
  }

  updateInscriptionById(
    inscriptionId: string,
    inscription: InscriptionInterface
  ) {
    return this.httpClient.put<InscriptionInterface>(
      `${environment.apiURL}/inscriptions/${inscriptionId}`,
      inscription
    );
  }
}
