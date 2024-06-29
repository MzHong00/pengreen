import { useUserFetch } from "entities/user";
import { PublicVoteForm } from "features/voteForm/publicForm";
import { SetTitleBar } from "features/voteForm/setTitleBar";
import { SelectFormPage } from "features/voteForm/selectFormPage";

import styles from "./voteForm.module.css";
import { SelectCategory } from "features/voteForm/selectCategory";

export const VoteForm = () => {
  const { data: user } = useUserFetch();

  return (
    <form className={styles.form}>
      <div className={styles.innerContainer}>
        <SetTitleBar picture={user?.picture} />
        <SelectCategory />
        <SelectFormPage />
        <PublicVoteForm user={user} />
      </div>
    </form>
  );
};
