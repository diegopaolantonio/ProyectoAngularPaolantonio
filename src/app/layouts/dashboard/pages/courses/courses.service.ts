import { Injectable } from '@angular/core';
import { CourseInterface } from './models';
import { catchError, delay, finalize, mergeMap, of } from 'rxjs';
import { LoadingService } from '../../../../core/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  getCourses() {
    this.loadingService.setIsLoading(true);

    return this.httpClient
      .get<CourseInterface[]>(`${environment.apiURL}/courses`)
      .pipe(
        // delay(1000),
        finalize(() => this.loadingService.setIsLoading(false)),
        catchError((error) => {
          alert(`Error al cargar los cursos, ${error.statusText}`);
          return of([]);
        })
      );
  }

  createCourse(course: CourseInterface) {
    return this.httpClient
      .post<CourseInterface>(`${environment.apiURL}/courses`, course)
      .pipe(
        mergeMap(() => this.getCourses()),
        // delay(1000),
        catchError((error) => {
          alert(`Error al crear el curso, ${error.statusText}`);
          return of([]);
        })
      );
  }

  updateCourseById(id: string, data: CourseInterface) {
    return this.httpClient
      .put<CourseInterface>(`${environment.apiURL}/courses/${id}`, data)
      .pipe(
        mergeMap(() => this.getCourses()),
        // delay(1000),
        catchError((error) => {
          alert(`Error al actualizar el curso, ${error.statusText}`);
          return of([]);
        })
      );
  }

  deleteCourseById(id: string) {
    return this.httpClient
      .delete<CourseInterface>(`${environment.apiURL}/courses/${id}`)
      .pipe(
        mergeMap(() => this.getCourses()),
        // delay(1000),
        catchError((error) => {
          alert(`Error al eliminar el curso, ${error.statusText}`);
          return of([]);
        })
      );
  }
}
