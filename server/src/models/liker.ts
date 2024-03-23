import { type ObjectId } from "mongodb";

export interface Liker {
    _id?: ObjectId;
    user_id: string;
    vote_id: string;
}