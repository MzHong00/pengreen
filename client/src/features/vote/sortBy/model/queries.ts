import { useQuery } from "@tanstack/react-query";

import { readVote, readVoteById } from "entities/vote";

export const useFetchSortedVoteList = (queryString: string) => {
  return useQuery({
    queryKey: ["vote"],
    queryFn: () => readVote(queryString),
  });
};

export const useFetchVoteById = (voteId: string) => {
  return useQuery({
    queryKey: ["vote", voteId],
    queryFn: () => readVoteById(voteId),
  });
};
