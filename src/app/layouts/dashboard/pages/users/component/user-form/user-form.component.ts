import { Component, EventEmitter, Inject, Output } from '@angular/core';
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
      dni: this.fb.control(0, [Validators.required]),
      firstName: this.fb.control('', [Validators.required]),
      lastName: this.fb.control('', [Validators.required]),
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required]),
      role: this.fb.control('', [Validators.required]),
    });

    if (editUser) {
      this.userForm.patchValue(editUser);
    }
  }

  onSave(): void {
    this.dialogRef.close(this.userForm.value);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}