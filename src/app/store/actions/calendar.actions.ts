import { createAction, props } from "@ngrx/store";
import { Appointment } from "../../models/appointment.model";

export const setActiveDate = createAction(
  "[Calendar] Set Active Date",
  props<{ date: Date }>()
);
