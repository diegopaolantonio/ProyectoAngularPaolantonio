import { Pipe, PipeTransform } from '@angular/core';

export interface fullNameInterface {
  firstName: string;
  lastName: string;
}

@Pipe({
  name: 'fullName',
})
export class FullNamePipe implements PipeTransform {
  transform(value: fullNameInterface, ...args: unknown[]): unknown {
    return value.lastName + ', ' + value.firstName;
  }
}
