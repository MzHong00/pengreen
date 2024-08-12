export interface User {
  _id: string;
  name: string;
  email: string;
  picture?: string;
  dateOfBirth?: Date;
  sex?: "female" | "male" | "남성" | "여성";
}
