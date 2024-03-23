import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateStudentInterface, StudentInterface } from './models';
import { environment } from '../../../../../environments/environment';
import { LoadingService } from '../../../../core/services/loading.service';
import { catchError, finalize, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentsService {
  constructor(private loadingService: LoadingService, private httpClient: HttpClient) {}

  getStudents() {
    this.loadingService.setIsLoading(true);

    return this.httpClient.get<StudentInterface[]>(
      `${environment.apiURL}/students`
    ).pipe(
      // delay(1000),
      finalize(() => {
        this.loadingService.setIsLoading(false);
      }),
      catchError((error) => {
        alert(`Error al cargar los estudiantes, ${error.statusText}`);
        return of([]);
      })
    );;
  }

  getStudentsById(studentId: string) {
    return this.httpClient.get<StudentInterface>(
      `${environment.apiURL}/students/${studentId}`
    );
  }

  postStudent(student: CreateStudentInterface) {
    return this.httpClient.post<StudentInterface>(
      `${environment.apiURL}/students`,
      student
    );
  }

  deleteStudentById(studentId: string) {
    return this.httpClient.delete<StudentInterface>(
      `${environment.apiURL}/students/${studentId}`
    );
  }

  putStudentById(studentId: string, student: StudentInterface) {
    return this.httpClient.put<StudentInterface>(
      `${environment.apiURL}/students/${studentId}`,
      student
    );
  }
}
