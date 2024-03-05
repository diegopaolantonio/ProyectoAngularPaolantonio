import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const DashboardActions = createActionGroup({
  source: 'Dashboard',
  events: {
    'Active Section': props<{ tittle: string }>(),
  },
});
