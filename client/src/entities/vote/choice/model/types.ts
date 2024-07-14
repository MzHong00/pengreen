import { VoteActionDto } from "entities/vote/vote";

export interface ChoiceDto {
  count: number;
  content: string;
}

export interface VoteActionChoiceDto extends VoteActionDto {
  choiceList: ChoiceDto['content'][];
}