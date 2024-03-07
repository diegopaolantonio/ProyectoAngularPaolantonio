import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { StudentInterface } from './models';
import { StudentsService } from './students.service';
import { TestBed } from '@angular/core/testing';

describe('Pruebas de StudentsService', () => {
  let studentsService: StudentsService;
  let httpController: HttpTestingController;

  const FAKE_STUDENT_1: StudentInterface[] = [
    {
      id: '1',
      name: 'FakeName1',
      profile: 'IT',
      gender: 'Masculino',
    },
    {
      id: '2',
      name: 'FakeName2',
      profile: 'IT',
      gender: 'Masculino',
    },
  ];

  const FAKE_STUDENT_2: StudentInterface = {
    id: '2',
    name: 'FakeName2',
    profile: 'IT',
    gender: 'Masculino',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StudentsService],
      imports: [HttpClientTestingModule],
    });

    studentsService = TestBed.inject(StudentsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe instanciarse correctamente', () => {
    expect(studentsService).toBeTruthy();
  });

  it('El getStudents() debe llamar al metodo GET y traer los 2 estudiantes de prueba', () => {
    studentsService.getStudents().subscribe({
      next: (students) => {
        expect(students).toEqual(FAKE_STUDENT_1);
        expect(students.length).toBe(2);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/students',
        method: 'GET',
      })
      .flush(FAKE_STUDENT_1);
  });

  it('El postStudent() debe llamar al metodo POST, devolver el estudiante de prueba nro 2', () => {
    studentsService.postStudent(FAKE_STUDENT_1[1]).subscribe({
      next: (students) => {
        expect(students).toEqual(FAKE_STUDENT_2);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/students',
        method: 'POST',
      })
      .flush(FAKE_STUDENT_1[1]);
  });

  it('El putStudentById() debe llamar al metodo PUT y devolver el estudiante de prueba nro 1', () => {
    studentsService.putStudentById('1', FAKE_STUDENT_1[0]).subscribe({
      next: (students) => {
        expect(students).toEqual(FAKE_STUDENT_1[0]);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/students/1',
        method: 'PUT',
      })
      .flush(FAKE_STUDENT_1[0]);
  });

  it('El deleteStudentById() debe llamar al metodo DELETE y devolver el estudiante eliminado de prueba nro 2', () => {
    studentsService.deleteStudentById('1').subscribe({
      next: (students) => {
        expect(students).toEqual(FAKE_STUDENT_2);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/students/1',
        method: 'DELETE',
      })
      .flush(FAKE_STUDENT_1[1]);
  });
});
