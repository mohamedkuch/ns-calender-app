import { Component, OnInit } from "@angular/core";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
  selector: "ns-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.scss"],
})
export class CalendarComponent implements OnInit {
  // Properties select menu items
  public selectedPropertyIndex = 0;
  public propertySelectItems: Array<string> = [
    "All properties",
    "2 Zimmer in Stendal",
    "Test",
  ];

  // Agents select menu items
  public selectedAgentIndex = 0;
  public AgentSelectItems: Array<string> = ["All agents", "Agent 1", "Agent 2"];

  constructor() {}

  ngOnInit(): void {}

  public onchange(args: SelectedIndexChangedEventData): void {
    console.log(
      `Drop Down selected index changed from ${args.oldIndex} to ${args.newIndex}`
    );
  }

  public onopen(): void {
    console.log("Drop Down opened.");
  }

  public onclose(): void {
    console.log("Drop Down closed.");
  }
}
