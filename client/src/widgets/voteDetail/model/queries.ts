import { useQueryClient } from '@tanstack/react-query';
import { VoteDto } from 'entities/vote/vote';

export const useGetChoiceData = <T>(voteId: VoteDto['_id'] ): T => {
    const queryClient = useQueryClient();

    return queryClient.getQueryData(['choice', voteId]) as T;
}