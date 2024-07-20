import { VoteDto } from "entities/vote/vote";
import { useEffect, useState } from "react";

//데이터를 간격에 맞게 잘라 반환해주는 함수
export const useSplitVoteList = (data: VoteDto[] = [], eleWidth: number) => {
  const [splitInterval, setSplitInterval] = useState(
    (window.innerWidth - 100) / eleWidth
  );
  useEffect(() => {
    const updateInterval = (e: any) => {
      setSplitInterval((e.target.innerWidth - 100) / eleWidth);
    };

    window.addEventListener("resize", updateInterval);

    return () => window.addEventListener("resize", updateInterval);
  }, [eleWidth]);

  let votePerPage = Math.floor(splitInterval) * 2;

  if (votePerPage === 0) {
    votePerPage = 1;
  }

  const voteList: VoteDto[][] = [];
  for (let i = 0; i < data.length; i += votePerPage) {
    voteList.push(data.slice(i, i + votePerPage));
  }

  return [voteList, votePerPage] as const;
};
