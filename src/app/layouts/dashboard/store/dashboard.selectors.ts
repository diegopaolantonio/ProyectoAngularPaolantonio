import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DashboardState, dashboardFeatureKey } from './dashboard.reducer';

export const selectDashboardState =
  createFeatureSelector<DashboardState>(dashboardFeatureKey);

export const selectActiveSection = createSelector(
  selectDashboardState,
  (state) => state.tittle
);
