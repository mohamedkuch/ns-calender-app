export class Address {
  street: string;
  houseNumber: string;
  city: string;
  country: string;
  zipCode: string;
  __typename: string;

  constructor(json) {
    this.street = json["street"];
    this.houseNumber = json["houseNumber"];
    this.city = json["city"];
    this.country = json["country"];
    this.zipCode = json["zipCode"];
    this.__typename = json["__typename"];
  }
}
