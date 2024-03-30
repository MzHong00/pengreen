import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { updateChoice } from "shared/api"
import { readEachChoiceCount, readMyPick } from "shared/api/choice"

export const useReadEachChoiceCount = (voteId: string, choiceList: Array<string>) => {
    return useQuery({
        queryKey: ['choice', voteId],
        queryFn: () => readEachChoiceCount({
            vote_id: voteId,
            choiceList: choiceList
        }),
        enabled: !!choiceList
    })
}

export const useReadMyPick = (userId: string, voteId: string) => {
    return useQuery({
        queryKey: ['isParticipant', voteId],
        queryFn: () => readMyPick({
            user_id: userId,
            vote_id: voteId,
        }),
        enabled: !!userId
    })
}

export const useUpdateChoice = (userId:string , voteId:string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (selected: Array<string>) => updateChoice({
            user_id: userId,
            vote_id: voteId,
            selected: selected
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['choice', voteId] });
            queryClient.invalidateQueries({ queryKey: ['isParticipant', voteId] });
            queryClient.invalidateQueries({ queryKey: ['participant', voteId] });
        }
    })
}