import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "@nativescript/angular";
import { AppComponent } from "./app.component";
import { CalenderComponent } from "./calender/calender.component";
import { DropDownModule } from "nativescript-drop-down/angular";

@NgModule({
  bootstrap: [AppComponent],
  imports: [NativeScriptModule, DropDownModule],
  declarations: [AppComponent, CalenderComponent],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA],
})
export class AppModule {}
