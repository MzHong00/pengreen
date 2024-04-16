import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { fetchLikesRead, fetchLikeUpdate } from "shared/api";

export const useReadLike = (userId: string, voteId: string) => {
    return useQuery({
        queryKey: ['like', userId, voteId],
        queryFn: () => fetchLikesRead({
            user_id: userId,
            vote_id: voteId
        }),
    })
}

export const useUpdateLike = (userId: string, voteId: string) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: fetchLikeUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vote', voteId] })
        }
    })

    const updateLike = () => {
        mutate({
            user_id: userId,
            vote_id: voteId
        });
    };

    return updateLike;
}