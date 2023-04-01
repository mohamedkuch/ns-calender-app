import { Action, createReducer, on } from "@ngrx/store";
import { Appointment } from "../../models/appointment.model";
import * as CalendarActions from "../actions/calendar.actions";

export interface CalendarState {
  activeDate: Date;
  activeWeek: Date[];
  displayedMonth: Date[];
  appointments: Appointment[];
}

export const initialState: CalendarState = {
  activeDate: new Date(),
  activeWeek: [],
  displayedMonth: [],
  appointments: [],
};

// Load appointments from JSON file (Mock Data)
// Extra : if we want to request the data from a server we need to create effect file
// and implement the logic to listen to the action of loading the appointments and request
// the data and merge it to our appointments object and also add maybe loading and
// error states to be used when requesting the data via GET HTTP request
// const appointments = require("../../data/appointments.json");
export const calendarReducer = createReducer(
  initialState,
  on(CalendarActions.setActiveDate, (state, { date }) => ({
    ...state,
    activeDate: date,
  }))
);

export function reducer(state: CalendarState, action: Action) {
  return calendarReducer(state, action);
}
