import { useQuery } from "@tanstack/react-query"
import { readVoteListSortedLikes, readVoteListSortedParticipants } from "shared/api"

export const useReadVoteListSortedLikes = () => {
    return useQuery({
        queryKey: ['sortedVotesByLikes'],
        queryFn: () => readVoteListSortedLikes()
    })
}

export const useReadVoteListSortedParticipants = () => {
    return useQuery({
        queryKey: ['sortedVotesByParticipants'],
        queryFn: () => readVoteListSortedParticipants()
    })
}