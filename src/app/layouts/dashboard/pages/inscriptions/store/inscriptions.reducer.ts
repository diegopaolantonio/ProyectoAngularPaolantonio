import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionInterface } from '../models';
import { UserInterface } from '../../users/models';
import { CourseInterface } from '../../courses/models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscriptions: InscriptionInterface[];
  users: UserInterface[];
  courses: CourseInterface[];
  loadingInscriptions: boolean;
  loadingUsers: boolean;
  loadingCourses: boolean;
  error: unknown;
}

export const initialState: State = {
  inscriptions: [],
  users: [],
  courses: [],
  loadingInscriptions: false,
  loadingUsers: false,
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

  on(InscriptionsActions.loadUsers, (state) => ({
    ...state,
    loadingUsers: true,
  })),
  on(InscriptionsActions.loadUsersSuccess, (state, action) => ({
    ...state,
    loadingUsers: false,
    users: action.users,
  })),
  on(InscriptionsActions.loadUsersFailure, (state, action) => ({
    ...state,
    loadingUsers: false,
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
