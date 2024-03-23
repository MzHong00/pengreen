import { useQuery } from "@tanstack/react-query"
import { readVoteByOwnerId, readVoteSortedLikes, readVoteSortedParticipants } from "shared/api"

export const useReadVoteByOwnerId = (ownId: string) => {
    return useQuery({
        queryKey: ['vote', ownId],
        queryFn: () => readVoteByOwnerId(ownId),
        enabled: !!ownId
    })
};

export const useReadVoteSortedLikes = () => {
    return useQuery({
        queryKey: ['vote'],
        queryFn: () => readVoteSortedLikes()
    })
}

export const useReadVoteSortedParticipants = () => {
    return useQuery({
        queryKey: ['vote'],
        queryFn: () => readVoteSortedParticipants
    })
}