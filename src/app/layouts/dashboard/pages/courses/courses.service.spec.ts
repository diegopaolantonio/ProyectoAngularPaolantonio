import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { TestBed } from '@angular/core/testing';
import { CourseInterface } from './models/index';

describe('Pruebas de CoursesService', () => {
  let coursesService: CoursesService;
  let httpController: HttpTestingController;
  let fakeCourses: CourseInterface[] = [];

  const FAKE_COURSES: CourseInterface[] = [
    {
      id: '1',
      code: 'fakeCode1',
      name: 'FakeName1',
      startDate: new Date('2024-01-01T03:00:00.000Z'),
      finishDate: new Date('2024-01-02T03:00:00.000Z'),
      price: 1000,
    },
    {
      id: '2',
      code: 'fakeCode2',
      name: 'FakeName2',
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
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe instanciarse correctamente', () => {
    expect(coursesService).toBeTruthy();
  });

  it('El getCourses() debe traer los cursos de prueba', async () => {
    coursesService.getCourses().subscribe({
      next: (courses) => {
        fakeCourses = courses;
        expect(fakeCourses).toEqual(FAKE_COURSES);
        expect(fakeCourses.length).toBe(2);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/courses',
        method: 'GET',
      })
      .flush(FAKE_COURSES);
  });
});
