import { type ObjectId } from "mongodb";

export interface Participant {
    _id?: ObjectId;
    user_id: string;
    vote_id: string;
    pick: Array<string>;
}