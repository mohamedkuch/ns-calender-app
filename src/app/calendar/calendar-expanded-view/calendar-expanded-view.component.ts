import { Component, OnInit } from "@angular/core";

const dayNames: Array<string> = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT",
];

@Component({
  selector: "ns-calendar-expanded-view",
  templateUrl: "./calendar-expanded-view.component.html",
  styleUrls: ["./calendar-expanded-view.component.scss"],
})
export class CalendarExpandedViewComponent implements OnInit {
  days: Array<string> = [];
  hours: Array<string> = [];
  data: Array<Array<string>> = [];

  constructor() {}

  ngOnInit(): void {
    this.initDaysArray();
    this.initHoursArray();
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

  initDaysArray(): void {
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

    this.days = dates
      .slice(7, 14)
      .map((date, index) => `${date} ${dayNames[index]}`);
  }

  generateGridRows() {
    return Array.from({ length: this.hours.length }, () => "*").join(",");
  }

  generateGridColumns() {
    return (
      "2*," + Array.from({ length: this.days.length }, () => "3*").join(",")
    );
  }

  onLeftTap(): void {
    console.log("### left");
  }

  onRightTap(): void {}
}
