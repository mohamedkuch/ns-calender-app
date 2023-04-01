import { Action, createReducer, on } from "@ngrx/store";
import { Appointment } from "../../models/appointment.model";
import * as CalendarActions from "../actions/calendar.actions";

export interface CalendarState {
  activeDate: Date;
  activeWeek: Date[];
  // this structure is to have 2d array for the
  // active month to be displayed in the short view calendar
  activeMonth: Array<Array<Date>>;
  activeMonthNumber: number;
  activeMonthDate: Date;
  appointments: Appointment[];
}

export const initialState: CalendarState = {
  activeDate: new Date(),
  activeWeek: getActiveWeek(new Date()),
  activeMonth: getActiveMonth(new Date()),
  activeMonthNumber: getActiveMonthNumber(new Date()),
  activeMonthDate: getFirstMonthDay(new Date()),
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
    activeWeek: getActiveWeek(date),
    activeMonth: getActiveMonth(date),
    activeMonthNumber: getActiveMonthNumber(date),
    activeMonthDate: getFirstMonthDay(date),
  })),
  on(CalendarActions.setActiveMonth, (state, { date }) => ({
    ...state,
    activeMonth: getActiveMonth(date),
    activeMonthNumber: getActiveMonthNumber(date),
    activeMonthDate: getFirstMonthDay(date),
  }))
);

// Explanation of the logic :
// getTime() will return date in ms

// sundayDate is the starting point of the calendar :
// sundayDate = date of the current activeDate - dayOfWeekIndex * 24hours
// dayOfWeekIndex is the index of days of the current activeDate (0 is Sunday)
// 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
// it is to convert a day to milliseconds unit

// example activeDate = 01/04/2023 => saturday
// dayOfWeekIndex = 6
// sundayDate = 01/04/2023 - 6 days = 26/03/2023

function getActiveWeek(activeDate: Date): Date[] {
  const dayOfWeekIndex = activeDate.getDay();

  const sundayDate = new Date(
    activeDate.getTime() - dayOfWeekIndex * 24 * 60 * 60 * 1000
  );
  const activeWeek = [];

  // this then very simple if we know the starting day then
  // we make a loop from the sunday starting day to saturday from 0->6 for i
  for (let i = 0; i < 7; i++) {
    const date = new Date(sundayDate.getTime() + i * 24 * 60 * 60 * 1000);
    activeWeek.push(date);
  }
  return activeWeek;
}

// Explanation of the logic :
// set up firstDayOfMonth by detecting the month from the input date
// calculate firstWeekofMonth by using getActiveWeek
// make a loop from the first day from the firstWeekofMonth to fill the result array

function getActiveMonth(activeDate: Date): Date[][] {
  const firstDayOfMonth = new Date(
    Date.UTC(activeDate.getFullYear(), activeDate.getMonth(), 1)
  );
  const firstWeekofMonth = getActiveWeek(firstDayOfMonth);
  const startDay = firstWeekofMonth[0];

  const activeMonth: Date[][] = [];

  for (let i = 0; i < 6; i++) {
    const week: Date[] = [];

    for (let j = 0; j < 7; j++) {
      const date = new Date(
        startDay.getTime() + (i * 7 + j) * 24 * 60 * 60 * 1000
      );
      week.push(date);
    }

    // check if the first day of the last week is a part of the month or not
    // if not we don't push it
    if (week[0].getMonth() !== firstDayOfMonth.getMonth() && i == 5) break;

    activeMonth.push(week);
  }
  return activeMonth;
}

function getActiveMonthNumber(activeDate: Date): number {
  return activeDate.getMonth() + 1;
}

// setting the first day as the value of the active month date so we can navigate between months
function getFirstMonthDay(date: Date): Date {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), 1));
}

export function reducer(state: CalendarState, action: Action) {
  return calendarReducer(state, action);
}
