import { User } from "./user";

import { type ObjectId } from "mongodb";

export interface Vote {
    _id?: ObjectId;
    owner: User;
    title: string;
    start_time: Date;
    deadline: Date;
    max_choice: number;
    like: Array<string>;
    participant: Array<string>;
    choice: Array<string>;
}

export type SortType = "like" | "participant"