import { createReducer, on } from '@ngrx/store';
import { DashboardActions } from './dashboard.actions';

export const dashboardFeatureKey = 'dashboardTittle';

export interface DashboardState {
  tittle: string;
}

export const initialState: DashboardState = {
  tittle: '',
};

export const DashboardReducer = createReducer(
  initialState,
  on(DashboardActions.activeSection, (state, action) => {
    return {
      ...state,
      tittle: action.tittle,
    };
  })
);
