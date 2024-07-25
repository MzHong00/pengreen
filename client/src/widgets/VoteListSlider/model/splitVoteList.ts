import { VoteDto } from "entities/vote/vote";

export const splitVoteList = (array: VoteDto[] | undefined, partSize: number) => {
  if (!array) return;

  let result = [];

  for (let i = 0; i < 3; i++) {
    const splitedArray = array.slice(partSize * i, partSize * (i + 1));
    result.push(splitedArray);
  }

  return result;
};
