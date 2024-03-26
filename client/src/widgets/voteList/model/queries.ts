import { useQuery } from "@tanstack/react-query"
import { readVoteListByOwnerId, readVoteListSortedLikes, readVoteListSortedParticipants } from "shared/api"

export const useReadVoteListByOwnerId = (ownId: string) => {
    return useQuery({
        queryKey: ['vote', ownId],
        queryFn: () => readVoteListByOwnerId(ownId),
        enabled: !!ownId
    })
};

export const useReadVoteListSortedLikes = () => {
    return useQuery({
        queryKey: ['vote'],
        queryFn: () => readVoteListSortedLikes()
    })
}

export const useReadVoteListSortedParticipants = () => {
    return useQuery({
        queryKey: ['vote'],
        queryFn: () => readVoteListSortedParticipants()
    })
}