import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { InscriptionsService } from './inscriptions.service';
import { InscriptionInterface } from './models';
import { TestBed } from '@angular/core/testing';

describe('Pruebas de InscriptionsService', () => {
  let inscriptionsService: InscriptionsService;
  let httpController: HttpTestingController;

  const FAKE_INSCRIPTION_1: InscriptionInterface[] = [
    {
      id: '1',
      studentId: '11',
      courseId: '21',
      createdUserId: 'FakeUser11',
      createdDate: new Date(),
      modifiedUserId: 'FakeUser12',
      modifiedDate: new Date(),
    },
    {
      id: '2',
      studentId: '12',
      courseId: '22',
      createdUserId: 'FakeUser21',
      createdDate: new Date(),
      modifiedUserId: 'FakeUser22',
      modifiedDate: new Date(),
    },
  ];

  const FAKE_INSCRIPTION_2: InscriptionInterface = {
    id: '2',
    studentId: '12',
    courseId: '22',
    createdUserId: 'FakeUser21',
    createdDate: new Date(),
    modifiedUserId: 'FakeUser22',
    modifiedDate: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InscriptionsService],
      imports: [HttpClientTestingModule],
    });

    inscriptionsService = TestBed.inject(InscriptionsService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('El servicio debe instanciarse correctamente', () => {
    expect(inscriptionsService).toBeTruthy();
  });

  it('El getInscriptions() debe llamar al metodo GET y traer las 2 inscripciones de prueba', () => {
    inscriptionsService.getInscriptions().subscribe({
      next: (inscriptions) => {
        expect(inscriptions).toEqual(FAKE_INSCRIPTION_1);
        expect(inscriptions.length).toBe(2);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/inscriptions?_embed=student&_embed=course',
        method: 'GET',
      })
      .flush(FAKE_INSCRIPTION_1);
  });

  it('El postStudent() debe llamar al metodo POST, devolver la inscripcion de prueba nro 2', () => {
    inscriptionsService.postInscription(FAKE_INSCRIPTION_1[1]).subscribe({
      next: (inscriptions) => {
        expect(inscriptions).toEqual(FAKE_INSCRIPTION_2);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/inscriptions',
        method: 'POST',
      })
      .flush(FAKE_INSCRIPTION_1[1]);
  });

  it('El putInscriptionById() debe llamar al metodo PUT y devolver la inscripcion de prueba nro 1', () => {
    inscriptionsService
      .putInscriptionById('1', FAKE_INSCRIPTION_1[0])
      .subscribe({
        next: (inscriptions) => {
          expect(inscriptions).toEqual(FAKE_INSCRIPTION_1[0]);
        },
      });

    httpController
      .expectOne({
        url: 'http://localhost:3000/inscriptions/1',
        method: 'PUT',
      })
      .flush(FAKE_INSCRIPTION_1[0]);
  });

  it('El deleteStudentById() debe llamar al metodo DELETE y devolver la inscripcion eliminada de prueba nro 2', () => {
    inscriptionsService.deleteInscriptionById('1').subscribe({
      next: (inscriptions) => {
        expect(inscriptions).toEqual(FAKE_INSCRIPTION_2);
      },
    });

    httpController
      .expectOne({
        url: 'http://localhost:3000/inscriptions/1',
        method: 'DELETE',
      })
      .flush(FAKE_INSCRIPTION_1[1]);
  });
});
