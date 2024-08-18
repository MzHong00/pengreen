import { useEffect, useState } from "react";

// 한 페이지에 보여지는 Vote 개수를 계산하는 함수
export const useCalcVotePerPage = (eleWidth: number, columnCount: number) => {
  const [voteListRow, setVoteListRow] = useState<number>(
    Math.max(1, (window.innerWidth - 256) / eleWidth)
  );

  useEffect(() => {
    const calcListRow = (e: any) => {
      let newListRow = Math.max(1, (e.target.innerWidth - 256) / eleWidth);
      
      setVoteListRow(newListRow);
    };

    window.addEventListener("resize", calcListRow);

    return () => window.addEventListener("resize", calcListRow);
  }, [eleWidth]);

  return Math.floor(voteListRow) * columnCount;
};
