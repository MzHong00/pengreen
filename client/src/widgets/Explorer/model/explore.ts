import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { VoteDto } from "widgets/vote";
import { useFetchSortedVoteList } from "features/vote/sortBy/model/queries";

//Sort 쿼리 스트링에 따른 Vote Data Fetching
export const useFetchVotes = () => {
    const [sortParams] = useSearchParams();
    
    const { data: sortedVotes, refetch } = useFetchSortedVoteList(sortParams.toString());
    
    useEffect(() => {
        refetch()
    }, [sortParams, refetch]);

    return sortedVotes;
}

//창의 크기에 따라 Vote가 보일 수 있는 개수
export const useVisibleVoteCount = (eleWidth: number) => {
    const [splitInterval, setSplitInterval] = useState((window.innerWidth - 100) / eleWidth);

    useEffect(() => {
        const updateInterval = (e: any) => {
            setSplitInterval((e.target.innerWidth - 100) / eleWidth)
        }

        window.addEventListener('resize', updateInterval)

        return () => window.addEventListener('resize', updateInterval)
    }, [eleWidth])

    return Math.floor(splitInterval);
}

//데이터를 간격에 맞게 잘라 반환해주는 함수
export const sliceVotes = (data: VoteDto[] = [], chunkSize: number): VoteDto[][] => {
    if (chunkSize === 0) {
        chunkSize = 1;
    }

    const chunks: VoteDto[][] = [];
    for (let i = 0; i < data.length; i += chunkSize) {
        chunks.push(data.slice(i, i + chunkSize));
    }

    return chunks
}
