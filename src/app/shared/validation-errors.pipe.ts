import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationErrors',
})
export class ValidationErrorsPipe implements PipeTransform {
  transform(errors?: ValidationErrors | null, ...args: unknown[]): unknown {
    if (!!errors) {
      let messages = [];

      if (errors['required']) messages.push('Campo requerido');
      if (errors['email']) messages.push('Ingrese un email valido');
      if (errors['minlength'])
        messages.push(
          `Debe tener mas de ${errors['minlength']?.requiredLength} caracteres`
        );

      return messages.join('. ') + '.';
    }
    return null;
  }
}
