import { useQuery } from "@tanstack/react-query"
import { readVoteListSortedLikes, readVoteListSortedParticipants } from "shared/api"

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