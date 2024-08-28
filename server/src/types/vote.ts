import { type ObjectId } from "mongodb";
import { categories } from "./consts";

export interface Vote extends VoteForm {
  _id?: ObjectId;
  likes: Array<string>;
  participants: Participant[];
  start_time: Date;
}

export interface VoteForm {
  title: string;
  choice: ChoiceItem[];
  max_choice: number;
  category: (typeof categories)[number];
  description: string;
}

export interface ChoiceItem {
  content: string,
  count: number
}

export interface Participant {
  user_id: string;
  pick: Array<string>;
}

export interface Liker {
  _id?: ObjectId;
  user_id: string;
  vote_id: string;
}