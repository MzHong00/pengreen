import { useEffect, useState } from "react";
import { VoteDto } from "widgets/vote";

export const useResizeConfig = (widthOfOneVote: number) => {
    const [splitInterval, setSplitInterval] = useState((window.innerWidth - 100) / widthOfOneVote);

    useEffect(() => {
        const updateInterval = (e: any) => {
            setSplitInterval((e.target.innerWidth - 100) / widthOfOneVote)
        }

        window.addEventListener('resize', updateInterval)

        return () => window.addEventListener('resize', updateInterval)
    }, [widthOfOneVote])

    return Math.floor(splitInterval);
}

export const splitVotes = (data: VoteDto[], spliteInterval: number) => {
    if (spliteInterval === 0) {
        spliteInterval = 1;
    }
    const splitedVote = data && chunkArray(data, spliteInterval);

    return ({
        splitedVote: splitedVote,
    })
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}
