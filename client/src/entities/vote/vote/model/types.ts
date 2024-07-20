import { categories } from "..";
import { VoteFormDto } from "entities/voteForm";

export interface VoteDto extends VoteFormDto {
  _id: string;
  like: Array<string>;
  participant: Participant[];
  start_time: Date;
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