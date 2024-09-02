import { ObjectId } from "mongodb";
import { regions, gender } from "./consts";

export interface User extends UserDetail {
  _id: ObjectId | string;
  name: string;
  email: string;
  picture?: string;
  userType?: "regular" | "premium";
}

export interface UserDetail {
  gender?: (typeof gender)[number];
  birth?: Date;
  location?: (typeof regions)[number];
}
