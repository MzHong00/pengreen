import { useQueryClient } from '@tanstack/react-query';

export const useGetChoiceData = (voteId: string ): Array<Object> => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData(['choice', voteId]) as Array<Object>
}