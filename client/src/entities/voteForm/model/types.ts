import { Category } from "entities/vote/vote";
import { User } from "entities/user";

export interface VoteFormDto {
  owner: User;
  title: string;
  choice: string[];
  max_choice: number;
  category: Category;
  description: string;
}
