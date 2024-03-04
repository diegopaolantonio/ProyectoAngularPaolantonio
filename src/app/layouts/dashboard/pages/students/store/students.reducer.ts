import { createFeature, createReducer, on } from '@ngrx/store';
import { StudentsActions } from './students.actions';
import { StudentInterface } from '../models';

export const studentsFeatureKey = 'students';

export interface State {
  students: StudentInterface[];
  loading: boolean;
  error: unknown;
}

export const initialState: State = {
  students: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(StudentsActions.loadStudents, (state) => ({
    ...state,
    loading: true,
  })),
  on(StudentsActions.loadStudentsSuccess, (state, action) => ({
    ...state,
    loading: true,
    students: action.students,
  })),
  on(StudentsActions.loadStudentsFailure, (state, action) => ({
    ...state,
    loading: true,
    error: action.error,
  }))
);

export const studentsFeature = createFeature({
  name: studentsFeatureKey,
  reducer,
});
