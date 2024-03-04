import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StudentInterface, updateStudentInterface } from '../../models';
import { StudentsActions } from '../../store/students.actions';
import { Observable } from 'rxjs';
import { selectStudents } from '../../store/students.selectors';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.scss',
})
export class StudentFormComponent {
  student$: Observable<StudentInterface[]>;

  studentForm: FormGroup;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<StudentFormComponent>,
    @Inject(MAT_DIALOG_DATA) private editStudent?: updateStudentInterface
  ) {
    this.studentForm = this.formBuilder.group({
      name: this.formBuilder.control('', Validators.required),
      profile: this.formBuilder.control('', Validators.required),
      gender: this.formBuilder.control('', Validators.required),
    });

    this.store.dispatch(StudentsActions.loadStudents());

    this.student$ = this.store.select(selectStudents);

    if (editStudent) {
      this.studentForm.patchValue(editStudent.student);
    }
  }

  onSubmit(): void {
    if (this.studentForm.invalid) {
      this.studentForm.markAllAsTouched();
    } else {
      if (!this.editStudent?.updateString) {
        this.store.dispatch(
          StudentsActions.createStudent({
            student: this.studentForm.value,
          })
        );
      } else {
        this.store.dispatch(
          StudentsActions.updateStudent({
            studentId: this.editStudent.student.id,
            student: this.studentForm.value,
          })
        );
      }
      this.matDialogRef.close();
    }
  }
}
