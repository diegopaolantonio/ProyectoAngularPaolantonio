import { TestBed } from '@angular/core/testing';
import { CoursesComponent } from './courses.component';
import { CoursesService } from './courses.service';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../../../core/store';

describe('Pruebas de CoursesComponent', () => {
  let coursesComponent: CoursesComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoursesComponent],
      providers: [
        MockProvider(CoursesService, {
          getCourses: () =>
            of([
              {
                code: 'ABCD1234',
                name: 'Analisis Matematico 1',
                hours: 1,
                classes: 10,
                teacher: 'Juan',
                startDate: new Date('2024-02-05T03:00:00.000Z'),
                finishDate: new Date('2024-07-15T03:00:00.000Z'),
                price: 25350,
                id: 'a02c',
              },
              {
                code: 'AB12CD34',
                name: 'Fisica 1',
                hours: 2,
                classes: 20,
                teacher: 'Pedro',
                startDate: new Date('2024-02-13T03:00:00.000Z'),
                finishDate: new Date('2024-07-23T03:00:00.000Z'),
                price: 20500,
                id: '5e25',
              },
              {
                code: 'CDCD3412_2',
                name: 'Algebra 1',
                hours: 3,
                classes: 30,
                teacher: 'Alberto',
                startDate: new Date('2024-03-01T03:00:00.000Z'),
                finishDate: new Date('2024-11-30T03:00:00.000Z'),
                price: 50700,
                id: '1541',
              },
            ]),
        }),
      ],
      imports: [StoreModule.forRoot(appReducers, {})],
    });
    coursesComponent =
      TestBed.createComponent(CoursesComponent).componentInstance;
  });

  it('El component debe instanciarse correctamente', () => {
    expect(coursesComponent).toBeTruthy();
  });

  it('El componente debe contener las propiedades "id", "code", "name", "hours", "classes", "teacher", "startDate", "finishDate" y "price"', () => {
    expect(coursesComponent.courses[0].hasOwnProperty('id')).toBeTrue();
    expect(coursesComponent.courses[0].hasOwnProperty('code')).toBeTrue();
    expect(coursesComponent.courses[0].hasOwnProperty('name')).toBeTrue();
    expect(coursesComponent.courses[0].hasOwnProperty('hours')).toBeTrue();
    expect(coursesComponent.courses[0].hasOwnProperty('classes')).toBeTrue();
    expect(coursesComponent.courses[0].hasOwnProperty('teacher')).toBeTrue();
    expect(coursesComponent.courses[0].hasOwnProperty('startDate')).toBeTrue();
    expect(coursesComponent.courses[0].hasOwnProperty('finishDate')).toBeTrue();
    expect(coursesComponent.courses[0].hasOwnProperty('price')).toBeTrue();
  });

  it('Debe detecar que las propiedades de component son: "id" tipo string, code tipo string, name tipo string, startDate tipo Date, finishDate tipo Date y price tipo number', () => {
    expect(typeof coursesComponent.courses[0].id).toBe('string');
    expect(typeof coursesComponent.courses[0].code).toBe('string');
    expect(typeof coursesComponent.courses[0].name).toBe('string');
    expect(typeof (coursesComponent.courses[0].startDate instanceof Date))
      .toBeTrue;
    expect(typeof (coursesComponent.courses[0].finishDate instanceof Date))
      .toBeTrue;
    expect(typeof coursesComponent.courses[0].price).toBe('number');
  });

  it('Debe detectar 3 cursos cargados', () => {
    expect(coursesComponent.courses.length).toEqual(3);
  });

  it('Las columnas de la tabla de cursos deben ser (displayedColumns): "code", "name", "teacher", "startDate", "action"', () => {
    expect(coursesComponent.displayedColumns).toContain('code');
    expect(coursesComponent.displayedColumns).toContain('name');
    expect(coursesComponent.displayedColumns).toContain('teacher');
    expect(coursesComponent.displayedColumns).toContain('startDate');
    expect(coursesComponent.displayedColumns).toContain('action');
  });
});
