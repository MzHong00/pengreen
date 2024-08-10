import { useSearchParams } from "react-router-dom";

import { type Category } from "entities/vote/vote";
import { SelectCategory } from "features/vote/selectCategory";
import { SortByButton } from "features/vote/sortBy";
import { sortTypes } from "features/vote/sortBy/consts/sortTypes";
import { firstLetterUpperCase } from "shared/helper/firstLetterUpperCase";

import styles from './voteFilterBox.module.css'

export const VoteFilterBox = () => {
  let [filterParams, setFilterParams] = useSearchParams();

  const currentSort = firstLetterUpperCase(
    sortTypes.some((sort) => filterParams.get("sort") === sort.queryString)
      ? filterParams.get("sort")
      : "latest"
  );

  const setCategoryParamsHandler = (event: React.MouseEvent<HTMLElement>) => {
    filterParams.set("category", event.currentTarget.innerHTML);
    setFilterParams(filterParams);
  };

  const removeCategoryParamsHandler = () => {
    filterParams.delete("category");
    setFilterParams();
  };

  const setSortParamsHandler = (event: React.MouseEvent<HTMLElement>) => {
    const elementDataProps = event.currentTarget.dataset.sortType;

    elementDataProps
      ? filterParams.set("sort", `${elementDataProps}`)
      : filterParams.delete("sort");

    setFilterParams(filterParams);
  };

  return (
    <div className={styles.filterBox}>
      <SortByButton
        currentSort={currentSort}
        sortParamsHandler={setSortParamsHandler}
      />
      <SelectCategory
        selectedCategory={filterParams.get("category") as Category}
        selectHandler={setCategoryParamsHandler}
        removeSelectHandler={removeCategoryParamsHandler}
      />
    </div>
  );
};
