import { TestBed } from '@angular/core/testing';
import { InscriptionsComponent } from './inscriptions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../../../core/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';

describe('Pruebas de InscriptionsComponent', () => {
  let inscriptionsComponent: InscriptionsComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscriptionsComponent],
      providers: [],
      imports: [
        HttpClientTestingModule,
        StoreModule.forRoot(appReducers, {}),
        StoreModule.forFeature(inscriptionsFeature),
      ],
    });
    inscriptionsComponent = TestBed.createComponent(
      InscriptionsComponent
    ).componentInstance;
  });

  it('El component debe instanciarse correctamente', () => {
    expect(inscriptionsComponent).toBeTruthy();
  });

  it('Las columnas de la tabla de cursos deben ser (displayedColumns): "id", "studentName", "courseCode", "courseName", "action"', () => {
    expect(inscriptionsComponent.displayedColumns).toContain('id');
    expect(inscriptionsComponent.displayedColumns).toContain('studentName');
    expect(inscriptionsComponent.displayedColumns).toContain('courseCode');
    expect(inscriptionsComponent.displayedColumns).toContain('courseName');
    expect(inscriptionsComponent.displayedColumns).toContain('action');
  });
});
