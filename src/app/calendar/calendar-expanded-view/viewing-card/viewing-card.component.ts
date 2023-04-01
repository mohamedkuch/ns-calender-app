import { AfterViewInit, Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "ns-viewing-card",
  templateUrl: "./viewing-card.component.html",
  styleUrls: ["./viewing-card.component.scss"],
})
export class ViewingCardComponent implements OnInit, AfterViewInit {
  @Input() data: { viewingNumber: number; imageUrls: string[] };
  @Input() isInPast: boolean;

  constructor() {}
  ngAfterViewInit(): void {
    console.log("####", this.isInPast);
  }

  ngOnInit(): void {}
}
