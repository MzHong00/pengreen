import { VoteActionDto } from "entities/vote/vote";

export interface VoteActionLikesDto extends VoteActionDto {
  liker: Array<string>;
}
