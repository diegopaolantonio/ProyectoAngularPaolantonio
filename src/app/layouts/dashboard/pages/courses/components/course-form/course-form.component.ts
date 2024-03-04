import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseInterface } from '../../models';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss',
})
export class CourseFormComponent {
  courseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseFormComponent>,
    @Inject(MAT_DIALOG_DATA) private editCourse?: CourseInterface
  ) {
    this.courseForm = this.fb.group({
      code: this.fb.control('', [Validators.required]),
      name: this.fb.control('', [Validators.required]),
      hours: this.fb.control('', [Validators.required]),
      classes: this.fb.control('', [Validators.required]),
      teacher: this.fb.control(''),
      startDate: this.fb.control('', [Validators.required]),
      finishDate: this.fb.control(''),
      price: this.fb.control(null, [Validators.required]),
    });

    if (editCourse) {
      this.courseForm.patchValue(editCourse);
    }
  }

  onSave(): void {
    if (this.courseForm.invalid) {
      this.courseForm.markAllAsTouched();
    } else {
      this.dialogRef.close(this.courseForm.value);
    }
  }
}
