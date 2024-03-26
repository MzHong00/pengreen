import { useQuery } from "@tanstack/react-query"
import { VotePickDto } from "./types"
import { updateChoice } from "shared/api"
import { readEachChoiceCount, readIsParticipant } from "shared/api/choice"

export const useReadEachChoiceCount = (vote_id: string, choiceList: Array<string>) => {
    return useQuery({
        queryKey: ['choiceCount', vote_id],
        queryFn: () => readEachChoiceCount({
            vote_id: vote_id,
            choiceList: choiceList
        }),
        enabled: !!choiceList
    })
}

export const useReadIsParticipant = (user_id: string, vote_id: string) => {
    return useQuery({
        queryKey: ['isParticipant', vote_id],
        queryFn: () => readIsParticipant({
            user_id: user_id,
            vote_id: vote_id,
        }),
        enabled: !!user_id
    })
}

export const useUpdateChoice = ({
    user_id, vote_id, selected
}: VotePickDto) => {
    return useQuery({
        queryKey: ['pick', vote_id],
        queryFn: () => updateChoice({
            user_id: user_id,
            vote_id: vote_id,
            selected: selected
        }),
        enabled: !!selected
    })
}