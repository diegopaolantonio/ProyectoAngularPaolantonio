import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState =
  createFeatureSelector<fromInscriptions.State>(
    fromInscriptions.inscriptionsFeatureKey
  );

export const selectInscriptions = createSelector(
  selectInscriptionsState,
  (state) => state.inscriptions
);

export const selectLoadingInscriptions = createSelector(
  selectInscriptionsState,
  (state) => state.loadingInscriptions
);

export const selectInscriptionsUsers = createSelector(
  selectInscriptionsState,
  (state) => state.users
);

export const selectLoadingInscriptionsUsers = createSelector(
  selectInscriptionsState,
  (state) => state.loadingUsers
);

export const selectInscriptionsCourses = createSelector(
  selectInscriptionsState,
  (state) => state.courses
);

export const selectLoadingInscriptionsCourses = createSelector(
  selectInscriptionsState,
  (state) => state.loadingCourses
);
