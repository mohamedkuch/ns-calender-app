import { Property } from "./property.model";

export class Appointment {
  id: string;
  date: Date;
  maxInviteeCount: number;
  attendeeCount: number;
  showContactInformation: boolean;
  property: Property;
  __typename: string;

  constructor(json) {
    this.id = json["id"];
    this.date = new Date(json["date"]);
    this.maxInviteeCount = json["maxInviteeCount"];
    this.attendeeCount = json["attendeeCount"];
    this.showContactInformation = json["showContactInformation"];
    this.property = new Property(json["property"]);
    this.__typename = json["__typename"];
  }
}
