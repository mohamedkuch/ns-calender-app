import { Component, OnInit } from "@angular/core";
import { ModalDialogParams } from "@nativescript/angular";
import { Store } from "@ngrx/store";
import { Appointment } from "~/app/models/appointment.model";
import { setActiveAppointment } from "~/app/store/actions/calendar.actions";
import { CalendarState } from "~/app/store/reducers/calendar.reducer";

@Component({
  selector: "ns-appointment-modal",
  templateUrl: "./appointment-modal.component.html",
  styleUrls: ["./appointment-modal.component.scss"],
})
export class AppointmentModalComponent implements OnInit {
  currentAppointments: Appointment[];
  dateString: string = "";
  hourString: string = "";

  constructor(
    private params: ModalDialogParams,
    private store: Store<{ calendarState: CalendarState }>
  ) {
    this.store.dispatch(setActiveAppointment({ data: params.context.data }));
  }
  ngOnInit(): void {
    this.store.select("calendarState").subscribe((state: CalendarState) => {
      if (state.activeAppointments.length > 0) {
        this.currentAppointments = state.activeAppointments;
        this.dateString = this.currentAppointments[0].date.toDateString();
        this.hourString =
          this.currentAppointments[0].date.getUTCHours().toString() +
          ":00 - " +
          (this.currentAppointments[0].date.getUTCHours() + 1).toString() +
          ":00";
      }
    });
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
