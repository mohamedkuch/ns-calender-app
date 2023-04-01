import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ns-calendar-expanded-view",
  templateUrl: "./calendar-expanded-view.component.html",
  styleUrls: ["./calendar-expanded-view.component.scss"],
})
export class CalendarExpandedViewComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  onLeftTap(): void {
    console.log("### left");
  }

  onRightTap(): void {}
}
