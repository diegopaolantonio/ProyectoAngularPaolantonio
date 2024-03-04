import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionInterface } from '../models';
import { CourseInterface } from '../../courses/models';
import { StudentInterface } from '../../students/models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscriptions: InscriptionInterface[];
  students: StudentInterface[];
  courses: CourseInterface[];
  loadingInscriptions: boolean;
  loadingStudents: boolean;
  loadingCourses: boolean;
  error: unknown;
}

export const initialState: State = {
  inscriptions: [],
  students: [],
  courses: [],
  loadingInscriptions: false,
  loadingStudents: false,
  loadingCourses: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  on(InscriptionsActions.loadInscriptions, (state) => ({
    ...state,
    loadingInscriptions: true,
  })),
  on(InscriptionsActions.loadInscriptionsSuccess, (state, action) => ({
    ...state,
    loadingInscriptions: false,
    inscriptions: action.inscriptions,
  })),
  on(InscriptionsActions.loadInscriptionsFailure, (state, action) => ({
    ...state,
    loadingInscriptions: false,
    error: action.error,
  })),

  on(InscriptionsActions.loadStudents, (state) => ({
    ...state,
    loadingStudents: true,
  })),
  on(InscriptionsActions.loadStudentsSuccess, (state, action) => ({
    ...state,
    loadingStudents: false,
    students: action.students,
  })),
  on(InscriptionsActions.loadStudentsFailure, (state, action) => ({
    ...state,
    loadingStudents: false,
    error: action.error,
  })),

  on(InscriptionsActions.loadCourses, (state) => ({
    ...state,
    loadingCourses: true,
  })),
  on(InscriptionsActions.loadCoursesSuccess, (state, action) => ({
    ...state,
    loadingCourses: false,
    courses: action.courses,
  })),
  on(InscriptionsActions.loadCoursesFailure, (state, action) => ({
    ...state,
    loadingCourses: false,
    error: action.error,
  }))
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});
