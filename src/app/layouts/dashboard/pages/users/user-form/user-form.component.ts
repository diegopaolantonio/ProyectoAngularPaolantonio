import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;

  // Password
  hide = true;

  @Output()
  userAdded = new EventEmitter();

  @Output()
  cancelAdded = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      dni: this.fb.control(0, [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      role: this.fb.control('', [Validators.required]),
    });
  }

  addUser(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.userAdded.emit(this.userForm.value);
      this.userForm.reset();
      for (let name in this.userForm.controls) {
        this.userForm.controls[name].setErrors(null);
      }
      Object.keys(this.userForm.controls).forEach((key) => {
        const control = this.userForm.controls[key];
        control.clearValidators();
        control.updateValueAndValidity();
      });
    }
  }

  cancelAddUser(): void {
    this.cancelAdded.emit(true)
  }
}
