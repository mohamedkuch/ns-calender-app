import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { AppComponent } from "./app.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { CalendarFilterComponent } from "./calendar/calendar-filters/calendar-filter.component";
import { DropDownModule } from "nativescript-drop-down/angular";
import { CalendarShortViewComponent } from "./calendar/calendar-short-view/calendar-short-view.component";
import { CalendarNextViewComponent } from "./calendar/calendar-next-view/calendar-next-view.component";
import { CalendarExpandedViewComponent } from "./calendar/calendar-expanded-view/calendar-expanded-view.component";
import { ViewingCardComponent } from "./calendar/calendar-expanded-view/viewing-card/viewing-card.component";
import { StoreModule } from "@ngrx/store";
import { calendarReducer } from "./store/reducers/calendar.reducer";
import { AppointmentModalComponent } from "./calendar/appointment-modal/appointment-modal.component";

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    NativeScriptModule,
    DropDownModule,
    StoreModule.forRoot({ calendarState: calendarReducer }),
  ],
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarFilterComponent,
    CalendarShortViewComponent,
    CalendarNextViewComponent,
    CalendarExpandedViewComponent,
    ViewingCardComponent,
    AppointmentModalComponent,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
