import { VoteActionDto } from "entities/vote";

export interface VoteActionLikesDto extends VoteActionDto {
  liker: Array<string>;
}
