import { createAction, props } from "@ngrx/store";
import { Appointment } from "~/app/models/appointment.model";

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

export const setAppointments = createAction(
  "[Calendar] Set Appointments",
  props<{ data: JSON }>()
);

export const setActiveAppointment = createAction(
  "[Calendar] Set Active Appointment",
  props<{ data: Appointment[] }>()
);
