import { regions, sex } from "./consts";

export interface User extends UserDetail {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  userType?: "regular" | "premium";
}

export interface UserDetail {
  sex?: (typeof sex)[number];
  birth?: Date;
  location?: (typeof regions)[number];
}
