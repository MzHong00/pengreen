import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

// pageNumber를 쿼리 스트링으로 설정하는 함수
export const usePagination = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [pageParams, setPageParams] = useSearchParams();

  useEffect(() => {
    pageParams.set("page", `${pageNumber}`);
    setPageParams(pageParams);
  }, [pageNumber, pageParams, setPageParams]);

  return [pageNumber, setPageNumber] as const;
};
