import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CourseInterface } from '../../models';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrl: './course-form.component.scss'
})
export class CourseFormComponent {
  courseForm: FormGroup;

constructor(
  private fb: FormBuilder,
  private dialogRef: MatDialogRef<CourseFormComponent>,
  @Inject(MAT_DIALOG_DATA) private editCourse?: CourseInterface
) {
  this.courseForm = this.fb.group({
    code: this.fb.control(''),
    name: this.fb.control(''),
    startDate: this.fb.control(''),
    finishDate: this.fb.control(''),
    price: this.fb.control(0),
  });

  if(editCourse) {
    this.courseForm.patchValue(editCourse);
  }
}

onSave(): void {
  this.dialogRef.close(this.courseForm.value);
}

onCancel(): void {
  this.dialogRef.close();
}
}
