import { type User } from "features/profiles/modifyInfo/model/types";

export interface VoteDto {
    _id: string;
    owner: User;
    title: string;
    start_time: Date;
    deadline: Date;
    max_choice: number;
    like: Array<string>;
    participant: Array<string>;
    choice: Array<string>;
}