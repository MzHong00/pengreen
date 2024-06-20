import { useQuery } from "@tanstack/react-query";
import { readVoteByOwner } from "entities/vote";
import { readVoteParticipants } from "entities/voteParticipants";

export const useReadVoteParticipants = (voteId: string) => {
  return useQuery({
    queryKey: ["participant", voteId],
    queryFn: () => readVoteParticipants(voteId),
  });
};
export const useReadVoteListByOwnerId = (ownId: string) => {
  return useQuery({
    queryKey: ["vote", ownId],
    queryFn: () => readVoteByOwner(ownId),
    enabled: !!ownId,
  });
};
