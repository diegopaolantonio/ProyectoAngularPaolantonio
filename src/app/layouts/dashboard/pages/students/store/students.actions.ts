import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateStudentInterface, StudentInterface } from '../models';

export const StudentsActions = createActionGroup({
  source: 'Students',
  events: {
    'Load Students': emptyProps(),
    'Load Students Success': props<{ students: StudentInterface[] }>(),
    'Load Students Failure': props<{ error: unknown }>(),

    'Create Student': props<{ student: CreateStudentInterface }>(),
    'Create Student Success': props<{ student: StudentInterface }>(),
    'Create Student Failure': props<{ error: unknown }>(),

    'Delete Student': props<{ studentId: string }>(),
    'Delete Student Success': props<{ student: StudentInterface }>(),
    'Delete Student Failure': props<{ error: unknown }>(),

    'Update Student': props<{
      studentId: string;
      student: StudentInterface;
    }>(),
    'Update Student Success': props<{ student: StudentInterface }>(),
    'Update Student Failure': props<{ error: unknown }>(),
  },
});
