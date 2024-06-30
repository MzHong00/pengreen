import { categories } from "..";
import { User } from "entities/user";
import { VoteForm } from "entities/voteForm";

export interface VoteDto extends VoteForm {
  _id: string;
  owner: User;
}

export interface VoteActionDto {
  user_id: string;
  vote_id: string;
}

export interface Participant {
  user_id: string;
  participant: Array<string>;
}

export type Category = (typeof categories)[number];