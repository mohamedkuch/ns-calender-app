import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { setActiveWeek } from "~/app/store/actions/calendar.actions";
import { CalendarState } from "~/app/store/reducers/calendar.reducer";

const dayNames: Array<string> = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

@Component({
  selector: "ns-calendar-expanded-view",
  templateUrl: "./calendar-expanded-view.component.html",
  styleUrls: ["./calendar-expanded-view.component.scss"],
})
export class CalendarExpandedViewComponent implements OnInit, OnDestroy {
  days: Array<{ dayString: string; isActive: boolean; isInPast: boolean }> = [];
  hours: Array<string> = [];
  activeDate: Date = new Date();
  activeWeek: Date[];
  WeekDateString: string = "";

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<{ calendarState: CalendarState }>) {}

  ngOnInit(): void {
    this.store
      .select("calendarState")
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: CalendarState) => {
        this.activeDate = state.activeDate;
        this.activeWeek = state.activeWeek;
        this.WeekDateString = this.setWeekDateString(state.activeWeek);
        this.days = state.activeWeek.map((day: Date) => {
          const dayOfWeek = dayNames[day.getDay()];
          return {
            dayString: `${day.getDate()} ${dayOfWeek}`,
            isActive: this.isDatesEqual(day, state.activeDate),
            isInPast: this.isDayInPast(day, state.activeDate),
          };
        });
      });
    this.initHoursArray();
  }

  setWeekDateString(activeWeek: Date[]): string {
    const firstDateOfWeek = new Date(activeWeek[0]);
    const lastDateOfWeek = new Date(activeWeek[activeWeek.length - 1]);

    const monthName = monthNames[firstDateOfWeek.getMonth()];
    const year = firstDateOfWeek.getFullYear();

    return `${firstDateOfWeek.getDate()} - ${lastDateOfWeek.getDate()}  ${monthName} ${year}`;
  }

  isDatesEqual(firstDate: Date, secondDate: Date): boolean {
    let res: boolean = false;
    if (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getFullYear() === secondDate.getFullYear()
    ) {
      res = true;
    }
    return res;
  }

  isDayInPast(day: Date, activeDay: Date): boolean {
    return (
      day.getDate() < activeDay.getDate() &&
      day.getMonth() <= activeDay.getMonth() &&
      day.getFullYear() <= activeDay.getFullYear()
    );
  }

  formatHourTime(timeString: string): string {
    const timeParts = timeString.split(" ")[0].split(":");
    return `${timeParts[0]}:${timeParts[1]}`;
  }

  initHoursArray(): void {
    for (let i = 8; i < 20; i++) {
      const hour = new Date();
      hour.setHours(i);
      hour.setMinutes(0);
      hour.setSeconds(0);
      hour.setMilliseconds(0);
      this.hours.push(
        this.formatHourTime(
          hour.toLocaleTimeString("de-DE", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          })
        )
      );
    }
  }

  generateGridRows() {
    return Array.from({ length: this.hours.length }, () => "*").join(",");
  }

  generateGridColumns() {
    return (
      "2*," + Array.from({ length: this.days.length }, () => "3*").join(",")
    );
  }

  onPrevWeek(): void {
    let prevWeekDate = new Date(
      this.activeWeek[0].getTime() - 7 * 24 * 60 * 60 * 1000
    );
    this.store.dispatch(setActiveWeek({ date: prevWeekDate }));
  }

  onNextWeek(): void {
    let nextWeekDate = new Date(
      this.activeWeek[0].getTime() + 7 * 24 * 60 * 60 * 1000
    );
    this.store.dispatch(setActiveWeek({ date: nextWeekDate }));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
