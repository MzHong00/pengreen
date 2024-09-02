import { regions } from "shared/consts";

export interface User extends UserDetail {
  _id?: string;
  name: string;
  email: string;
  picture: string;
  userType?: "regular" | "premium";
}

export interface UserDetail {
  gender?: "남" | "여";
  birth?: Date;
  location?: (typeof regions)[number];
}
