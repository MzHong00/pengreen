import { type ObjectId } from "mongodb";

export interface Choice {
    _id?: ObjectId;
    content: string;
    count: number;
}