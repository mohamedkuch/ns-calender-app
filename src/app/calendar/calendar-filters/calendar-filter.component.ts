import { Component, OnInit } from "@angular/core";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";

@Component({
  selector: "ns-calendar-filter",
  templateUrl: "./calendar-filter.component.html",
  styleUrls: ["./calendar-filter.component.scss"],
})
export class CalendarFilterComponent implements OnInit {
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

  public onchange(args: SelectedIndexChangedEventData): void {}

  public onopen(): void {}

  public onclose(): void {}
}
