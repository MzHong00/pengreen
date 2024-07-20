import { useSearchParams } from "react-router-dom";

import { SelectCategory } from "features/vote/selectCategory";
import { SortByButton } from "features/vote/sortBy";
import { sortTypes } from "features/vote/sortBy/consts/sortTypes";
import { firstLetterUpperCase } from "shared/utils/firstLetterUpperCase";

export const VoteFilterBox = () => {
  let [sortQs] = useSearchParams();

  const currentSort = firstLetterUpperCase(
    sortTypes.some((sort) => sortQs.get("sort") === sort.queryString)
      ? sortQs.get("sort")
      : "latest"
  );

  return (
    <>
      <SortByButton currentSort={currentSort} />
      <SelectCategory />
    </>
  );
};
