import { type ObjectId } from "mongodb";
import { categories } from "./consts";
import { User } from "./user";

export interface Vote extends VoteForm {
  _id?: ObjectId | string;
  likes: Array<User["_id"]>;
  participants: Array<Participant>;
  start_time: Date;
}

export interface VoteForm {
  owner: User;
  title: string;
  choice: ChoiceItem[];
  max_choice: number;
  category: (typeof categories)[number];
  description: string;
}

export interface ChoiceItem {
  content: string;
  count: number;
}

export interface Participant {
  user: Pick<User, "_id" | "location" | "gender" | "birth">;
  pick: ChoiceItem['content'][];
}
