import { Injectable, ɵɵstylePropInterpolate4 } from '@angular/core';
import { CourseInterface } from './models';
import { catchError, delay, finalize, mergeMap, of } from 'rxjs';
import { LoadingService } from '../../../../core/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Pagination } from '../../../../core/models';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(
    private loadingService: LoadingService,
    private httpClient: HttpClient
  ) {}

  getAllCourses() {
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

  getCourses(page: number, perPage: number) {
    this.loadingService.setIsLoading(true);

    return this.httpClient
      .get<Pagination<CourseInterface[]>>(
        `${environment.apiURL}/courses?_page=${page}&_per_page=${perPage}`
      )
      .pipe(
        // delay(1000),
        finalize(() => this.loadingService.setIsLoading(false)),
        catchError((error) => {
          alert(`Error al cargar los cursos, ${error.statusText}`);
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

  createCourse(course: CourseInterface, page: number, perPage: number) {
    return this.httpClient
      .post<CourseInterface>(`${environment.apiURL}/courses`, course)
      .pipe(
        mergeMap(() => this.getCourses(page, perPage)),
        // delay(1000),
        catchError((error) => {
          alert(`Error al crear el curso, ${error.statusText}`);
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

  updateCourseById(
    id: string,
    data: CourseInterface,
    page: number,
    perPage: number
  ) {
    return this.httpClient
      .put<CourseInterface>(`${environment.apiURL}/courses/${id}`, data)
      .pipe(
        mergeMap(() => this.getCourses(page, perPage)),
        // delay(1000),
        catchError((error) => {
          alert(`Error al actualizar el curso, ${error.statusText}`);
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

  deleteCourseById(id: string, page: number, perPage: number) {
    return this.httpClient
      .delete<CourseInterface>(`${environment.apiURL}/courses/${id}`)
      .pipe(
        mergeMap(() => this.getCourses(page, perPage)),
        // delay(1000),
        catchError((error) => {
          alert(`Error al eliminar el curso, ${error.statusText}`);
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
