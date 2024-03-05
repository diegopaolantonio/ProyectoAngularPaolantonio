import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserInterface } from '../../models';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent {
  userForm: FormGroup;

  hide = true;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private editUser?: UserInterface
  ) {
    this.userForm = this.fb.group({
      dni: this.fb.control(null, [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      phone: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      profile: this.fb.control('', [Validators.required]),
    });

    if (editUser) {
      this.userForm.patchValue(editUser);
    }
  }

  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.userForm.value);
    }
  }
}
