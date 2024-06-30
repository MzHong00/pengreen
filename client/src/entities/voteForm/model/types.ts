import { Category, Participant } from "entities/vote/vote";

export interface VoteForm extends VoteOption {
  title: string;
  like: Array<string>;
  participant: Participant[];
  choice: Array<string>;
}

interface VoteOption {
  start_time: string;
  max_choice: number;
  category: Category[];
  description: string;
}
