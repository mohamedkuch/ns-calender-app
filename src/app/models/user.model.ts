class Profile {
  firstname: string;
  name: string;
  phone: string;
  gender: string;
  title: string;

  constructor(json) {
    this.firstname = json["firstname"];
    this.name = json["name"];
    this.phone = json["phone"];
    this.gender = json["gender"];
    this.title = json["title"];
  }
}

export class User {
  profile: Profile;
  usertype: string;
  __typename: string;

  constructor(json) {
    this.profile = new Profile(json["profile"]);
    this.usertype = json["usertype"];
    this.__typename = json["__typename"];
  }
}
