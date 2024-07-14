import { Category } from "entities/vote/vote";

export interface VoteFormDto {
  title: string;
  choice: string[];
  max_choice: number;
  category: Category[];
  description: string;
}
