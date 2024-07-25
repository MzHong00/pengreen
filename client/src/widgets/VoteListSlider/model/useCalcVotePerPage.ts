import { useEffect, useState } from "react";

const VOTE_LIST_COLUMN = 2;

// 한 페이지에 보여지는 Vote 개수를 계산하는 함수
export const useCalcVotePerPage = (eleWidth: number) => {
  const [voteListRow, setVoteListRow] = useState<number>(
    Math.max(1, (window.innerWidth - 100) / eleWidth)
  );

  useEffect(() => {
    const calcListRow = (e: any) => {
      let newListRow = Math.max(1, (e.target.innerWidth - 100) / eleWidth);

      setVoteListRow(newListRow);
    };

    window.addEventListener("resize", calcListRow);

    return () => window.addEventListener("resize", calcListRow);
  }, [eleWidth]);

  return Math.floor(voteListRow) * VOTE_LIST_COLUMN;
};
