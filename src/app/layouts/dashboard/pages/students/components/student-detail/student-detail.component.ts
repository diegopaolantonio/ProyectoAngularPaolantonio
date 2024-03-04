import { Component, Inject } from '@angular/core';
import { StudentInterface, updateStudentInterface } from '../../models';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { Store } from '@ngrx/store';
import { StudentsActions } from '../../store/students.actions';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrl: './student-detail.component.scss',
})
export class StudentDetailComponent {
  student: StudentInterface = { id: '', name: '', profile: '', gender: '' };

  constructor(
    private store: Store,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private viewStudent?: StudentInterface
  ) {
    if (viewStudent) this.student = viewStudent;
  }

  onUpdate(student: StudentInterface): void {
    this.matDialog.open(StudentFormComponent, {
      data: { student, updateString: 'update' },
    });
  }

  onDelete(studentId: string): void {
    this.store.dispatch(StudentsActions.deleteStudent({ studentId }));
  }
}
