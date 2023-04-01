import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { setActiveDate } from "~/app/store/actions/calendar.actions";
import { CalendarState } from "~/app/store/reducers/calendar.reducer";

@Component({
  selector: "ns-calendar-short-view",
  templateUrl: "./calendar-short-view.component.html",
  styleUrls: ["./calendar-short-view.component.scss"],
})
export class CalendarShortViewComponent implements OnInit, OnDestroy {
  days: Array<string> = ["S", "M", "T", "W", "T", "F", "S"];
  month: Array<
    Array<{
      day: Date;
      dayNumber: number;
      isTextGrayed: boolean;
      isActiveWeek: boolean;
      isActiveDay: boolean;
    }>
  > = [];
  activeDate: Date = new Date();

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<{ calendarState: CalendarState }>) {
    this.store
      .select("calendarState")
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: CalendarState) => {
        this.month = state.activeMonth.map((weeks: Date[]) => {
          this.activeDate = state.activeDate;
          return weeks.map((day: Date) => {
            return {
              day: day,
              dayNumber: day.getDate(),
              isTextGrayed: day.getMonth() + 1 !== state.activeMonthNumber,
              isActiveWeek: this.isDayInActiveWeek(day, state.activeWeek),
              isActiveDay: this.isDatesEqual(day, state.activeDate),
            };
          });
        });
      });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  isDatesEqual(firstDate: Date, secondDate: Date): boolean {
    let res: boolean = false;
    if (
      firstDate.getDate() === secondDate.getDate() &&
      firstDate.getMonth() === secondDate.getMonth()
    ) {
      res = true;
    }
    return res;
  }

  onDateChanged(newDay: Date): void {
    this.store.dispatch(setActiveDate({ date: newDay }));
  }

  isDayInActiveWeek(day: Date, week: Date[]): boolean {
    let res: boolean = false;
    week.forEach((weekDay: Date) => {
      if (this.isDatesEqual(weekDay, day)) res = true;
    });
    return res;
  }

  ngOnInit(): void {}

  onLeftTap(): void {}

  onRightTap(): void {}
}
