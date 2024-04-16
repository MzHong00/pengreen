import { useQuery } from "@tanstack/react-query"
import { fetchSortedVoteList } from "shared/api"
import { fetchVoteById } from "shared/api/vote"

export const useFetchSortedVoteList = (queryString: string) => {
    return useQuery({
        queryKey: ['vote'],
        queryFn: () => fetchSortedVoteList(queryString)
    })
}

export const useFetchVoteById = (voteId: string) => {
    return useQuery({
        queryKey: ['vote', voteId],
        queryFn: () => fetchVoteById(voteId)
    })
}