import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

import { Increment, Decrement, Reset } from "../store/actions/calendar.actions";

@Component({
  selector: "ns-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  data$: Observable<any>;

  constructor(private store: Store<{ calendarState: any }>) {
    store.pipe(select("calendarState")).subscribe((data) => {
      console.log("####", data);
    });
  }

  ngOnInit(): void {}
}
