import { categories } from "..";
import { User } from "entities/user";
import { VoteFormDto } from "entities/voteForm";

export interface VoteDto extends VoteFormDto {
  _id: string;
  owner: User;
  like: Array<string>;
  participant: Participant[];
  start_time: string;
}

export interface VoteActionDto {
  user_id?: string;
  vote_id: string;
}

export interface Participant {
  user_id: string;
  participant: Array<string>;
}

export type Category = (typeof categories)[number];