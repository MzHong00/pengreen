import { categories } from "..";
import { VoteFormDto } from "entities/voteForm";

export interface VoteDto extends VoteFormDto {
  _id: string;
  like_member: string[];
  participant_member: Participant[];
  start_time: Date;
}

export interface Participant {
  user_id: string;
  pick: string[];
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
