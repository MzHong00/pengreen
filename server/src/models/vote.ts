import { User } from "./user";
import { Participant } from "./participant";

import { type ObjectId } from "mongodb";

export interface Vote extends VoteOption {
    _id?: ObjectId;
    owner: User;
    title: string;
    like: Array<string>;
    participant: Participant[];
    choice: Array<string>;
}

export interface VoteOption {
    start_time: Date;
    deadline: Date;
    max_choice: number;
    category: string;
    hashtag: string;
  }

export type SortType = "like" | "participant"