import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ns-calendar-short-view",
  templateUrl: "./calendar-short-view.component.html",
  styleUrls: ["./calendar-short-view.component.scss"],
})
export class CalendarShortViewComponent implements OnInit {
  days: Array<string> = ["S", "M", "T", "W", "T", "F", "S"];
  weeks: Array<Array<number>> = [];

  constructor() {}

  ngOnInit(): void {
    this.initWeeksArray();
  }

  initWeeksArray(): void {
    // Get current month and year
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    // Get the number of days in the month
    const numDays = new Date(year, month + 1, 0).getDate();

    // Get the first day of the month
    const firstDay = new Date(year, month, 1).getDay();

    // Generate an array of all the dates in the month
    const dates = Array.from({ length: numDays }, (_, i) => i + 1);

    // Add empty cells to the beginning of the array to align the first date with the correct weekday
    for (let i = 0; i < firstDay; i++) {
      dates.unshift(null);
    }

    // Split the array of dates into chunks of 7 (for each week)
    this.weeks = Array.from({ length: 5 }, (_, i) =>
      dates.slice(i * 7, (i + 1) * 7)
    );
  }

  onLeftTap(): void {}

  onRightTap(): void {}
}
