import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserInterface } from '../models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;

  // Password
  hide = true;

  @Input()
  tempUser: UserInterface[] = [];

  @Output()
  userAdded = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      dni: this.fb.control('', Validators.required),
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required),
      role: this.fb.control('', Validators.required),
    });
  }

  addUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.userAdded.emit(this.userForm.value);
      this.userForm.reset({
        dni: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
      });
    }
  }

  onUserEdited(tempUsers: UserInterface): void {
    console.log(tempUsers);
    // console.log(this.userForm);
    // this.dataSource = [...this.dataSource, { ...ev }];
  }
}
