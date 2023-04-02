import { Address } from "./address.model";
import { User } from "./user.model";

export class Property {
  id: string;
  name: string;
  inviteeCount: number;
  address: Address;
  attachments: any[];
  user: User;
  __typename: string;

  constructor(json) {
    this.id = json["id"];
    this.name = json["name"];
    this.inviteeCount = json["inviteeCount"];
    this.address = new Address(json["address"]);
    this.attachments = json["attachments"];
    this.user = new User(json["user"]);
    this.__typename = json["__typename"];
  }
}
