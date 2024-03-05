import {
  LoginReducer,
  loginFeatureKey,
} from '../../layouts/auth/pages/login/store/login.reducer';
import {
  DashboardReducer,
  dashboardFeatureKey,
} from '../../layouts/dashboard/store/dashboard.reducer';

export const appReducers = {
  [loginFeatureKey]: LoginReducer,
  [dashboardFeatureKey]: DashboardReducer,
};
