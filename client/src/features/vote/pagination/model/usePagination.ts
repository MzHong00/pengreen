import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const usePagination = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [pageParams, setPageParams] = useSearchParams();

  useEffect(() => {
    pageParams.set("page", `${pageNumber}`);
    setPageParams(pageParams);
  }, [pageNumber, pageParams, setPageParams]);

  return [pageNumber, setPageNumber] as const;
};
