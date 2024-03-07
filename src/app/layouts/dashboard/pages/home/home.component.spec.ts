import { TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../../../core/store';
import { MatCardModule } from '@angular/material/card';

describe('Pruebas de HomeComponent', () => {
  let homeComponent: HomeComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [],
      imports: [StoreModule.forRoot(appReducers, {}), MatCardModule],
    });
    homeComponent = TestBed.createComponent(HomeComponent).componentInstance;
  });

  it('El component debe instanciarse correctamente', () => {
    expect(homeComponent).toBeTruthy();
  });
});
