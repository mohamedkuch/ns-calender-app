import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subject, takeUntil } from "rxjs";
import { CalendarState } from "~/app/store/reducers/calendar.reducer";

@Component({
  selector: "ns-calendar-short-view",
  templateUrl: "./calendar-short-view.component.html",
  styleUrls: ["./calendar-short-view.component.scss"],
})
export class CalendarShortViewComponent implements OnInit, OnDestroy {
  days: Array<string> = ["S", "M", "T", "W", "T", "F", "S"];
  month: Array<
    Array<{ day: number; isTextGrayed: boolean; isBgGray: boolean }>
  > = [];
  activeWeek: Date[];

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private store: Store<{ calendarState: CalendarState }>) {
    this.store
      .select("calendarState")
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((state: CalendarState) => {
        this.activeWeek = state.activeWeek;
        this.month = state.activeMonth.map((weeks: Date[]) => {
          return weeks.map((day: Date) => {
            return {
              day: day.getDate(),
              isTextGrayed: day.getMonth() + 1 !== state.activeMonthNumber,
              isBgGray: this.isDayInActiveWeek(day, this.activeWeek),
            };
          });
        });
        console.log("###", this.month);
      });
  }
  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  isDayInActiveWeek(day: Date, week: Date[]): boolean {
    let res: boolean = false;
    week.forEach((weekDay: Date) => {
      if (
        weekDay.getDate() === day.getDate() &&
        weekDay.getMonth() === day.getMonth()
      ) {
        res = true;
      }
    });
    return res;
  }

  ngOnInit(): void {
    // this.store.dispatch(setActiveDate({ date: new Date("10/04/2000") }));
  }

  onLeftTap(): void {}

  onRightTap(): void {}
}
