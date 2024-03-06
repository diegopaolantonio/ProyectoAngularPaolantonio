import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { MockProvider } from 'ng-mocks';
import { AuthService } from '../../auth.service';
import { SharedModule } from '../../../../shared/shared.module';
import { Validators } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { appReducers } from '../../../../core/store';

describe('Pruebas de LoginComponent', () => {
  let loginComponent: LoginComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [SharedModule, StoreModule.forRoot(appReducers, {})],
      providers: [MockProvider(AuthService)],
    });

    loginComponent = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('El componente debe instanciarse correctamente', () => {
    expect(loginComponent).toBeTruthy();
  });

  it('El email debe tener los controles requeridos (required and email type)', () => {
    expect(
      loginComponent.loginForm.get('email')?.hasValidator(Validators.required)
    ).toBeTrue();
    expect(
      loginComponent.loginForm.get('email')?.hasValidator(Validators.email)
    ).toBeTrue();
  });

  it('La contrasena debe tener el control requerido (required)', () => {
    expect(
      loginComponent.loginForm
        .get('password')
        ?.hasValidator(Validators.required)
    ).toBeTrue();
  });

  it('Si se presiona enviar con el formulario vacio, este debe dar invalid y marcar sus campos como touched', () => {
    loginComponent.loginForm.patchValue({
      email: '',
      password: '',
    });

    expect(loginComponent.loginForm.invalid).toBeTrue();

    const spyOnMarkAllAsTouched = spyOn(
      loginComponent.loginForm,
      'markAllAsTouched'
    );

    loginComponent.onSubmit();

    expect(spyOnMarkAllAsTouched).toHaveBeenCalled();
  });
});
