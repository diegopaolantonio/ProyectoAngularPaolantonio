import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../inscriptions.service';
import { CoursesService } from '../../courses/courses.service';
import { StudentsService } from '../../students/students.service';

@Injectable()
export class InscriptionsEffects {
  
  loadInscriptions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptions),
      concatMap(() =>
        this.inscriptionsService.getInscriptions().pipe(
          map((inscriptions) =>
            InscriptionsActions.loadInscriptionsSuccess({ inscriptions })
          ),
          catchError((error) =>
            of(InscriptionsActions.loadInscriptionsFailure({ error }))
          )
        )
      )
    );
  });

  createInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) =>
        this.inscriptionsService.postInscription(action.inscription).pipe(
          map((inscription) =>
            InscriptionsActions.createInscriptionSuccess({ inscription })
          ),
          catchError((error) =>
            of(InscriptionsActions.createInscriptionFailure({ error }))
          )
        )
      )
    );
  });

  createInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.createInscriptionSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      concatMap((action) =>
        this.inscriptionsService
          .deleteInscriptionById(action.inscriptionId)
          .pipe(
            map((inscription) =>
              InscriptionsActions.deleteInscriptionSuccess({ inscription })
            ),
            catchError((error) =>
              of(InscriptionsActions.deleteInscriptionFailure({ error }))
            )
          )
      )
    );
  });

  deleteInscriptionSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscriptionSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  updateInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.updateInscription),
      concatMap((action) =>
        this.inscriptionsService
          .putInscriptionById(action.inscriptionId, action.inscription)
          .pipe(
            map((inscription) =>
              InscriptionsActions.updateInscriptionSuccess({ inscription })
            ),
            catchError((error) =>
              of(InscriptionsActions.updateInscriptionFailure({ error }))
            )
          )
      )
    );
  });

  updateInscriptionsSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.updateInscriptionSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  loadStudents$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadStudents),
      concatMap(() =>
          this.studentsService.getStudents().pipe(
          map((students) => InscriptionsActions.loadStudentsSuccess({ students })),
          catchError((error) =>
            of(InscriptionsActions.loadStudentsFailure({ error }))
          )
        )
      )
    );
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadCourses),
      concatMap(() =>
        this.coursesService.getCourses().pipe(
          map((courses) => InscriptionsActions.loadCoursesSuccess({ courses })),
          catchError((error) =>
            of(InscriptionsActions.loadCoursesFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private inscriptionsService: InscriptionsService,
    private studentsService: StudentsService,
    private coursesService: CoursesService,
  ) {}
}
