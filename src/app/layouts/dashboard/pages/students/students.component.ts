import { Component } from '@angular/core';
import { StudentInterface } from './models';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { StudentsService } from './students.service';
import { MatDialog } from '@angular/material/dialog';
import {
  selectLoadingStudents,
  selectStudents,
} from './store/students.selectors';
import { StudentsActions } from './store/students.actions';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { StudentDetailComponent } from './components/student-detail/student-detail.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.scss',
})
export class StudentsComponent {
  students: StudentInterface[] = [];
  studentsSubscription?: Subscription;
  isLoading$: Observable<boolean>;

  destroyed$ = new Subject();

  displayedColumns: string[] = ['id', 'name', 'profile', 'gender', 'action'];

  constructor(
    private store: Store,
    private studentsService: StudentsService,
    private matDialog: MatDialog
  ) {
    this.store
      .select(selectStudents)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (students) => (this.students = students),
      });

    this.isLoading$ = this.store.select(selectLoadingStudents);
    this.store.dispatch(StudentsActions.loadStudents());
  }

  createStudent(): void {
    this.matDialog.open(StudentFormComponent);
  }

  deleteStudentById(studentId: string) {
    this.store.dispatch(StudentsActions.deleteStudent({ studentId }));
  }

  updateStudentById(student: StudentInterface): void {
    this.matDialog.open(StudentFormComponent, {
      data: { student, updateString: 'update' },
    });
  }

  viewStudent(student: StudentInterface): void {
    this.matDialog.open(StudentDetailComponent, {
      data: student,
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
