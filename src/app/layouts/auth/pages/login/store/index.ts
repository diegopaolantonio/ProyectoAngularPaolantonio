import { LoginReducer, loginFeatureKey } from './login.reducer';

export const appReducers = {
  [loginFeatureKey]: LoginReducer,
};
