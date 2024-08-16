import { type User } from "entities/user";
import { type Category } from "entities/vote/vote";
import { type ChoiceDto } from "entities/vote/choice";

export interface VoteFormDto {
  owner: User;
  title: string;
  choice: ChoiceDto[];
  max_choice: number;
  category: Category;
  description: string;
}
