import { Component } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";

@Component({
  selector: "ns-appointment-modal",
  templateUrl: "./appointment-modal.component.html",
  styleUrls: ["./appointment-modal.component.scss"],
})
export class AppointmentModalComponent {
  constructor(private params: ModalDialogParams) {
    console.log("###", params.context.data);
  }

  onPrevWeek(): void {
    // let prevWeekDate = new Date(
    //   this.activeWeek[0].getTime() - 7 * 24 * 60 * 60 * 1000
    // );
    // this.store.dispatch(setActiveWeek({ date: prevWeekDate }));
  }

  onNextWeek(): void {
    // let nextWeekDate = new Date(
    //   this.activeWeek[0].getTime() + 7 * 24 * 60 * 60 * 1000
    // );
    // this.store.dispatch(setActiveWeek({ date: nextWeekDate }));
  }
}
