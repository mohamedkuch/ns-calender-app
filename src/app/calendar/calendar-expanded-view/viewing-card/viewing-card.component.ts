import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  ViewContainerRef,
} from "@angular/core";
import { ModalDialogService } from "@nativescript/angular";
import { AppointmentModalComponent } from "../../appointment-modal/appointment-modal.component";
import { Appointment } from "~/app/models/appointment.model";

@Component({
  selector: "ns-viewing-card",
  templateUrl: "./viewing-card.component.html",
  styleUrls: ["./viewing-card.component.scss"],
})
export class ViewingCardComponent implements OnInit, AfterViewInit {
  @Input() data: Appointment[];
  @Input() isInPast: boolean;

  constructor(
    private modalService: ModalDialogService,
    private viewContainerRef: ViewContainerRef
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  onOpenModal(): void {
    this.modalService
      .showModal(AppointmentModalComponent, {
        viewContainerRef: this.viewContainerRef,
        fullscreen: false,
        context: { data: this.data },
      })
      .then((result) => {
        console.log("Modal closed with result:", result);
      });
  }
}
