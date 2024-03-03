import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscriptionInterface, InscriptionInterface } from '../models';
import { UserInterface } from '../../users/models';
import { CourseInterface } from '../../courses/models';
import { Observable } from 'rxjs';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptions': emptyProps(),
    'Load Inscriptions Success': props<{
      inscriptions: InscriptionInterface[];
    }>(),
    'Load Inscriptions Failure': props<{ error: unknown }>(),

    'Create Inscription': props<{ inscription: CreateInscriptionInterface }>(),
    'Create Inscription Success': props<{
      inscription: InscriptionInterface;
    }>(),
    'Create Inscription Failure': props<{ error: unknown }>(),

    'Delete Inscriptions': props<{ inscriptionId: string }>(),
    'Delete Inscriptions Success': props<{
      inscription: InscriptionInterface;
    }>(),
    'Delete Inscriptions Failure': props<{ error: unknown }>(),

    'Update Inscription': props<{
      inscriptionId: string;
      inscription: InscriptionInterface;
    }>(),
    'Update Inscription Success': props<{
      inscription: InscriptionInterface;
    }>(),
    'Update Inscription Failure': props<{ error: unknown }>(),

    'Load Users': emptyProps(),
    'Load Users Success': props<{ users: UserInterface[] }>(),
    'Load Users Failure': props<{ error: unknown }>(),

    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ courses: CourseInterface[] }>(),
    'Load Courses Failure': props<{ error: unknown }>(),
  },
});
