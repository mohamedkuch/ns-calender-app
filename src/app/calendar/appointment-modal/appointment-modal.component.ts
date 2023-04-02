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
  appointments: Appointment[];
  currentAppointmnentIndex: number;

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
        this.appointments = state.appointments;
        this.currentAppointments = state.activeAppointments;
        this.currentAppointmnentIndex = state.appointments.indexOf(
          state.activeAppointments[0]
        );
        this.dateString = this.currentAppointments[0].date.toDateString();
        this.hourString =
          this.currentAppointments[0].date.getUTCHours().toString() +
          ":00 - " +
          (this.currentAppointments[0].date.getUTCHours() + 1).toString() +
          ":00";
      }
    });
  }

  onPrevAppointment(): void {
    if (this.currentAppointmnentIndex > 0) {
      this.store.dispatch(
        setActiveAppointment({
          data: [this.appointments[this.currentAppointmnentIndex - 1]],
        })
      );
    }
  }

  onNextAppointment(): void {
    if (this.currentAppointmnentIndex < this.appointments.length - 1) {
      this.store.dispatch(
        setActiveAppointment({
          data: [this.appointments[this.currentAppointmnentIndex + 1]],
        })
      );
    }
  }
}
