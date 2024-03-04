import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { CourseInterface } from './models/index';

describe('Pruebas de CoursesService', () => {
  let coursesService: CoursesService;
  let httpController1: HttpTestingController;
  let httpController2: HttpTestingController;

  const FAKE_COURSES_1: CourseInterface[] = [
    {
      id: '1',
      code: 'FakeCode1',
      name: 'FakeName1',
      hours: 1,
      classes: 10,
      teacher: 'FakeTeacher1',
      startDate: new Date('2024-01-01T03:00:00.000Z'),
      finishDate: new Date('2024-01-02T03:00:00.000Z'),
      price: 1000,
    },
    {
      id: '2',
      code: 'FakeCode2',
      name: 'FakeName2',
      hours: 2,
      classes: 20,
      teacher: 'FakeTeacher2',
      startDate: new Date('2024-02-01T03:00:00.000Z'),
      finishDate: new Date('2024-02-02T03:00:00.000Z'),
      price: 2000,
    },
  ];

  const FAKE_COURSES_2: CourseInterface[] = [
    {
      id: '2',
      code: 'FakeCode2',
      name: 'FakeName2',
      hours: 2,
      classes: 20,
      teacher: 'FakeTeacher2',
      startDate: new Date('2024-02-01T03:00:00.000Z'),
      finishDate: new Date('2024-02-02T03:00:00.000Z'),
      price: 2000,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoursesService],
      imports: [HttpClientTestingModule],
    });

    coursesService = TestBed.inject(CoursesService);
    httpController1 = TestBed.inject(HttpTestingController);
    httpController2 = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe instanciarse correctamente', () => {
    expect(coursesService).toBeTruthy();
  });

  it('El getCourses() debe llamar al metodo GET y traer los 2 cursos de prueba', () => {
    coursesService.getCourses().subscribe({
      next: (courses) => {
        expect(courses).toEqual(FAKE_COURSES_1);
        expect(courses.length).toBe(2);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/courses',
        method: 'GET',
      })
      .flush(FAKE_COURSES_1);
  });

  it('El createCourse() debe llamar al metodo POST, luego al GET y devolver el curso de prueba nro 2', () => {
    coursesService.createCourse(FAKE_COURSES_1[1]).subscribe({
      next: (courses) => {
        expect(courses).toEqual(FAKE_COURSES_2);
        expect(courses.length).toBe(1);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/courses',
        method: 'POST',
      })
      .flush(FAKE_COURSES_1);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/courses',
        method: 'GET',
      })
      .flush(FAKE_COURSES_2);
  });

  it('El updateCourseById() debe llamar al metodo PUT, luego al GET y devolver los 2 cursos de prueba', () => {
    coursesService.updateCourseById('1', FAKE_COURSES_1[0]).subscribe({
      next: (courses) => {
        expect(courses).toEqual(FAKE_COURSES_1);
        expect(courses.length).toBe(2);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/courses/1',
        method: 'PUT',
      })
      .flush(FAKE_COURSES_1[0]);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/courses',
        method: 'GET',
      })
      .flush(FAKE_COURSES_1);
  });

  it('El deleteCourseById() debe llamar al metodo DELETE, luego al GET y devolver el curso de prueba nro 2', () => {
    coursesService.deleteCourseById('1').subscribe({
      next: (courses) => {
        expect(courses).toEqual(FAKE_COURSES_2);
        expect(courses.length).toBe(1);
      },
    });

    httpController1
      .expectOne({
        url: 'http://localhost:3000/courses/1',
        method: 'DELETE',
      })
      .flush(FAKE_COURSES_1);

    httpController2
      .expectOne({
        url: 'http://localhost:3000/courses',
        method: 'GET',
      })
      .flush(FAKE_COURSES_2);
  });
});
