import { User } from "entities/user";
import { categories } from "..";
import { VoteFormDto } from "entities/voteForm";
import { ChoiceDto } from "entities/vote/choice";

export interface VoteDto extends VoteFormDto {
  _id: string;
  likes: Array<User["_id"]>;
  participants: Array<Participant>;
  start_time: Date;
}

export interface Participant {
  user: Pick<User, "_id" | "location" | "gender" | "birth">;
  pick: ChoiceDto["content"][];
}

export type Category = (typeof categories)[number];

export interface Pagination {
  prevID?: string;
  prevCount?: number;
  votePerPage: number;
}
