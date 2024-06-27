import { VoteActionDto } from "entities/vote";

export interface VoteActionChoiceDto extends VoteActionDto {
  choiceList: Array<string>;
}