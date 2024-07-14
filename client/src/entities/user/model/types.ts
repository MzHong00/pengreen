export interface User {
  _id?: string;
  name: string;
  email: string;
  picture?: string;
  dateOfBirth?: string;
  sex?: "female" | "male" | "남성" | "여성";
}
