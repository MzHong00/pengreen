import { User } from "entities/user";

export interface VoteDto extends VoteData {
  _id: string;
  owner: User;
}

export interface VoteActionDto {
  user_id: string;
  vote_id: string;
}

export interface VoteData extends VoteOption {
  title: string;
  like: Array<string>;
  participant: VoteParticipant[];
  choice: Array<string>;
}

export interface VoteOption {
  start_time: Date;
  deadline: Date;
  max_choice: number;
  category: string[];
  hashtag: string[];
}

export interface VoteParticipant {
  user_id: string;
  participant: Array<string>;
}
