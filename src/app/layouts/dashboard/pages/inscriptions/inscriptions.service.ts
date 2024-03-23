import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  InscriptionInterface,
  CreateInscriptionInterface,
} from './models/index';
import { environment } from '../../../../../environments/environment';
import { catchError, concatMap, finalize, of, throwError } from 'rxjs';
import { CourseInterface } from '../courses/models';
import { StudentInterface } from '../students/models';
import { LoadingService } from '../../../../core/services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class InscriptionsService {
  constructor(private loadingService: LoadingService, private httpClient: HttpClient) {}

  getInscriptions() {
    this.loadingService.setIsLoading(true);

    return this.httpClient.get<InscriptionInterface[]>(
      `${environment.apiURL}/inscriptions?_embed=student&_embed=course`
    ).pipe(
      // delay(1000),
      finalize(() => {
        this.loadingService.setIsLoading(false);
      }),
      catchError((error) => {
        alert(`Error al cargar las inscripciones, ${error.statusText}`);
        return of([]);
      })
    );;
  }

  getInscriptionsByStudentId(studentId: string) {
    return this.httpClient
      .get<StudentInterface>(`${environment.apiURL}/students/${studentId}`)
      .pipe(
        concatMap((student) =>
          this.httpClient.get(
            `${environment.apiURL}/inscriptions?studentId=${student.id}`
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

  putInscriptionById(inscriptionId: string, inscription: InscriptionInterface) {
    return this.httpClient.put<InscriptionInterface>(
      `${environment.apiURL}/inscriptions/${inscriptionId}`,
      inscription
    );
  }
}
