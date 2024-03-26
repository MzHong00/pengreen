import { useQuery } from "@tanstack/react-query"
import { readVoteParticipants } from "shared/api/vote"

export const useReadVoteParticipants = (voteId: string) => {
    return useQuery({
        queryKey: ['participant', voteId],
        queryFn: () => readVoteParticipants(voteId)
    })
}