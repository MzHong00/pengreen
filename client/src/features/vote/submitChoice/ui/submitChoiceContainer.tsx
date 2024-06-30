import { type MouseEvent } from "react";

import { useUserFetch } from "entities/user";
import { type VoteDto } from "entities/vote/vote";
import {
  useReadChoiceCount,
  useReadUserPick,
  useUpdateUserPick,
} from "entities/vote/choice";
import { SelectChoice } from "features/vote/selectChoice";
import { NumChart } from "shared/ui/Chart/numChart";
import { useToggle } from "shared/hooks/useToggle";

import styles from "./submitChoiceContainer.module.css";
import { getChoiceFormData } from "../lib/getChoiceFormData";

interface Props extends Pick<VoteDto, "_id" | `choice` | `max_choice`> {}

export const SubmitChoiceContainer = ({ _id, choice, max_choice }: Props) => {
  const { data: user } = useUserFetch();
  const { data: choiceData } = useReadChoiceCount({
    vote_id: _id,
    choiceList: choice,
  });
  const { data: userPick } = useReadUserPick({
    user_id: user?._id,
    vote_id: _id,
  });
  const { mutate: submitMutate } = useUpdateUserPick({
    user_id: user?._id,
    vote_id: _id,
  });
  const [isActive, activeToggleHandler] = useToggle();

  const submitHandler = (event: MouseEvent<HTMLInputElement>) => {
    activeToggleHandler();
    const formData = getChoiceFormData(event);
    
    //formData가 있을 때만 서버에 전송
    if(formData.length !== 0) submitMutate(formData);
  };

  return (
    <form className={styles.form}>
      <div className={styles.actionContainer}>
        <span
          className={`flex ${userPick && styles.console}`}
          data-username={user?.name}
          data-pick={userPick && userPick.join("\n")}
        >
          <input
            type="submit"
            value={`${!isActive ? "참여" : "제출"}`}
            onClick={submitHandler}
            className={`${styles.actionButton} ${
              !userPick ? "bg-sky-300" : "bg-green-300"
            } `}
          />
        </span>
        <div className={styles.maxChoiceButton}>
          <span>{`선택: ${max_choice}`}</span>
        </div>
      </div>
      {isActive ? (
        <SelectChoice choice={choice} max_choice={max_choice} />
      ) : (
        <NumChart data={choiceData} />
      )}
    </form>
  );
};
