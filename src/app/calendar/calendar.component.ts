import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { CalendarState } from "../store/reducers/calendar.reducer";
import { setActiveDate } from "../store/actions/calendar.actions";

@Component({
  selector: "ns-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  constructor(private store: Store<{ calendarState: CalendarState }>) {
    this.store.select("calendarState").subscribe((state: CalendarState) => {
      console.log("#### state", state);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(setActiveDate({ date: new Date("10/05/2000") }));
  }
}
