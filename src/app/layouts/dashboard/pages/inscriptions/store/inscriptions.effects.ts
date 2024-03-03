import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionsService } from '../inscriptions.service';
import { UsersService } from '../../users/users.service';
import { CoursesService } from '../../courses/courses.service';

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
      ofType(InscriptionsActions.deleteInscriptions),
      concatMap((action) =>
        this.inscriptionsService
          .deleteInscriptionById(action.inscriptionId)
          .pipe(
            map((inscription) =>
              InscriptionsActions.deleteInscriptionsSuccess({ inscription })
            ),
            catchError((error) =>
              of(InscriptionsActions.deleteInscriptionsFailure({ error }))
            )
          )
      )
    );
  });

  deleteInscriptionsSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscriptionsSuccess),
      map(() => InscriptionsActions.loadInscriptions())
    );
  });

  updateInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.updateInscription),
      concatMap((action) =>
        this.inscriptionsService
          .updateInscriptionById(action.inscriptionId, action.inscription)
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

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadUsers),
      concatMap(() =>
        this.usersService.getUsers().pipe(
          map((users) => InscriptionsActions.loadUsersSuccess({ users })),
          catchError((error) =>
            of(InscriptionsActions.loadUsersFailure({ error }))
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
    private usersService: UsersService,
    private coursesService: CoursesService
  ) {}
}
