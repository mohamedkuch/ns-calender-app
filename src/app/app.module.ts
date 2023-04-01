import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { AppComponent } from "./app.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { CalendarFilterComponent } from "./calendar/calender-filters/calendar-filter.component";

import { DropDownModule } from "nativescript-drop-down/angular";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, DropDownModule],
  declarations: [AppComponent, CalendarComponent, CalendarFilterComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
