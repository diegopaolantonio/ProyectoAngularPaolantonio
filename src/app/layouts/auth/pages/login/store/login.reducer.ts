import { createReducer, on } from '@ngrx/store';
import { LoginActions } from './login.actions';
import { UserInterface } from '../../../../dashboard/pages/users/models';

export const loginFeatureKey = 'login';

export interface LoginState {
  user: UserInterface | null;
}

export const initialState: LoginState = {
  user: null,
};

export const LoginReducer = createReducer(
  initialState,
  on(LoginActions.loadLogin, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(LoginActions.logoutLogin, () => initialState)
);
