import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { UserInterface } from '../../../../dashboard/pages/users/models';

export const LoginActions = createActionGroup({
  source: 'Login',
  events: {
    'Load Login': props<{ user: UserInterface }>(),
    'Logout Login': emptyProps(),
  },
});
