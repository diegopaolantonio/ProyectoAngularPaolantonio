import { Injectable } from '@angular/core';
import { CourseInterface } from './models';
import { delay, finalize, of } from 'rxjs';
import { LoadingService } from '../../../../core/services/loading.service';

let courses: CourseInterface[] = [
  {
    code: 'ABCD1234',
    name: 'Analisis Matematico 1',
    startDate: new Date('2024-02-05 00:00'),
    finishDate: new Date('2024-07-15 00:00'),
    price: 25350,
  },
  {
    code: 'AB12CD34',
    name: 'Fisica 1',
    startDate: new Date('2024-02-13 00:00'),
    finishDate: new Date('2024-07-23 00:00'),
    price: 20500,
  },
  {
    code: 'CDCD3412',
    name: 'Algebra',
    startDate: new Date('2024-03-02 00:00'),
    finishDate: new Date('2024-11-30 00:00'),
    price: 40700,
  },
  {
    code: '12AB34CD',
    name: 'Fisica 2',
    startDate: new Date('2024-08-06 00:00'),
    finishDate: new Date('2024-12-17 00:00'),
    price: 32000,
  },
  {
    code: '34AB12CD',
    name: 'Analisis Matematico 2',
    startDate: new Date('2024-07-29 00:00'),
    finishDate: new Date('2024-12-09 00:00'),
    price: 30250,
  },
];

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  constructor(private loadingService: LoadingService) {}

  getCourses() {
    this.loadingService.setIsLoading(true);
    return of(courses).pipe(
      delay(1500),
      finalize(() => this.loadingService.setIsLoading(false))
    );
  }

  createCourse(course: CourseInterface) {
    courses = [...courses, course];
    return this.getCourses();
  }

  updateCourseById(code: string, data: CourseInterface) {
    courses = courses.map((element) =>
      element.code === code ? { ...element, ...data } : element
    );
    return this.getCourses();
  }

  deleteCourseById(code: string) {
    courses = courses.filter((element) => element.code !== code);
    return this.getCourses();
  }
}
