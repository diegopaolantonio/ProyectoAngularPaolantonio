import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { StudentsActions } from './students.actions';
import { StudentsService } from '../students.service';

@Injectable()
export class StudentsEffects {
  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.loadStudents),
      concatMap(() =>
        this.studentsService.getStudents().pipe(
          map((students) => StudentsActions.loadStudentsSuccess({ students })),
          catchError((error) =>
            of(StudentsActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  createStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.createStudent),
      concatMap((action) =>
        this.studentsService.postStudent(action.student).pipe(
          map((student) => StudentsActions.createStudentSuccess({ student })),
          catchError((error) =>
            of(StudentsActions.createStudentFailure({ error }))
          )
        )
      )
    );
  });

  createStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.createStudentSuccess),
      map(() => StudentsActions.loadStudents())
    );
  });

  deleteStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.deleteStudent),
      concatMap((action) =>
        this.studentsService.deleteStudentById(action.studentId).pipe(
          map((student) => StudentsActions.deleteStudentSuccess({ student })),
          catchError((error) =>
            of(StudentsActions.deleteStudentFailure({ error }))
          )
        )
      )
    );
  });

  deleteStudentSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.deleteStudentSuccess),
      map(() => StudentsActions.loadStudents())
    );
  });

  updateStudent$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudent),
      concatMap((action) =>
        this.studentsService
          .putStudentById(action.studentId, action.student)
          .pipe(
            map((student) => StudentsActions.updateStudentSuccess({ student })),
            catchError((error) =>
              of(StudentsActions.updateStudentFailure({ error }))
            )
          )
      )
    );
  });

  updateStudentsSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(StudentsActions.updateStudentSuccess),
      map(() => StudentsActions.loadStudents())
    );
  });

  constructor(
    private actions$: Actions,
    private studentsService: StudentsService
  ) {}
}
