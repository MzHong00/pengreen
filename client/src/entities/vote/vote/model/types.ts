import { categories } from "..";
import { VoteFormDto } from "entities/voteForm";

export interface VoteDto extends VoteFormDto {
  _id: string;
  like: number;
  like_member: Array<string>;
  participant: number;
  participant_member: Participant[];
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

export interface Pagination {
  prevID?: string;
  prevCount?: number;
  votePerPage: number;
}

export interface VoteRequestBody {
  votePerPage: number;
  page: number;
}
