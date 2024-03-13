import { Choice } from "./choice";
import { User } from "./user";

export interface Vote {
    owner: User;
    title: string;
    start_time: Date;
    deadline: Date;
    max_choice: number;
    choice: Choice[];
}