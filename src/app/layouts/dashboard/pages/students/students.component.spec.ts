import { TestBed } from '@angular/core/testing';
import { StudentsComponent } from './students.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../../../core/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { studentsFeature } from './store/students.reducer';

describe('Pruebas de StudentsComponent', () => {
  let studentsComponent: StudentsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsComponent],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(appReducers, {}),
        StoreModule.forFeature(studentsFeature),
      ],
    });
    studentsComponent =
      TestBed.createComponent(StudentsComponent).componentInstance;
  });

  it('El component debe instanciarse correctamente', () => {
    expect(studentsComponent).toBeTruthy();
  });

  it('Las columnas de la tabla de cursos deben ser (displayedColumns): "id", "name", "profile", "gender", "action"', () => {
    expect(studentsComponent.displayedColumns).toContain('id');
    expect(studentsComponent.displayedColumns).toContain('name');
    expect(studentsComponent.displayedColumns).toContain('profile');
    expect(studentsComponent.displayedColumns).toContain('gender');
    expect(studentsComponent.displayedColumns).toContain('action');
  });
});
