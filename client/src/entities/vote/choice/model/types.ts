import { VoteActionDto } from "entities/vote/vote";

export interface VoteActionChoiceDto extends VoteActionDto {
  choiceList: Array<string>;
}