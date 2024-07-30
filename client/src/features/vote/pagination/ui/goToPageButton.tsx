import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "shared/ui/Button";

import styles from "./paginationSlider.module.css";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>> | undefined;
}

export const GoToPageButton = ({ page, setPage }: Props) => {
  const [inputPage, setInputPage] = useState<number>(page);

  useEffect(() => {
    setInputPage(page);
  }, [page]);

  const onChangeInputPage = (e: ChangeEvent<HTMLInputElement>) => {
    setInputPage(parseInt(e.target.value));
  };

  const onClickSetPage = () => {
    setPage && setPage(inputPage);
  };

  return (
    <div className={styles.movePageContainer}>
      <input
        type="number"
        title="페이지 이동"
        value={inputPage}
        onChange={onChangeInputPage}
        className={styles.movePageInput}
      />
      <Button className={styles.movePageButton} onClick={onClickSetPage}>
        이동
      </Button>
    </div>
  );
};
