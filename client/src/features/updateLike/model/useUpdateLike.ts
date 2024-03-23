import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { fetchLikesRead, fetchLikeUpdate } from "shared/api";

export const useReadLike = (userId: string, voteId: string) => {
    const { isPending, data } = useQuery({
        queryKey: ['like'],
        queryFn: () => fetchLikesRead({
            user_id: userId,
            vote_id: voteId
        }),
    })

    return { isPending, data };
}

export const useUpdateLike = (userId: string, voteId: string) => {
    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: fetchLikeUpdate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['like'] })
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