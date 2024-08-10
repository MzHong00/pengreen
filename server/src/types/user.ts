import { type ObjectId } from "mongodb";

export interface User {
  _id: ObjectId;
  name: string;
  email: string;
  picture?: string;
  dateOfBirth?: Date;
  sex?: "female" | "male" | "남성" | "여성";
}
