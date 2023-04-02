import { createAction, props } from "@ngrx/store";

export const setActiveDate = createAction(
  "[Calendar] Set Active Date",
  props<{ date: Date }>()
);

export const setActiveWeek = createAction(
  "[Calendar] Set Active Week",
  props<{ date: Date }>()
);

export const setActiveMonth = createAction(
  "[Calendar] Set Active Month",
  props<{ date: Date }>()
);
