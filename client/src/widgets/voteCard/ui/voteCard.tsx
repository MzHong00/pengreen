import { HTMLAttributes, useCallback, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import {
  useReadChoiceCount,
  useReadUserPick,
  useUpdateUserPick,
} from "entities/vote/choice";
import { type VoteDto } from "entities/vote/vote";
import { type VoteFormDto } from "entities/voteForm";
import { type User } from "entities/user";
import { useUpdateLike } from "entities/vote/likes";
import { UpdateLike } from "features/vote/updateLike";
import { Participant } from "features/vote/readParticipants";
import { ChoiceSubmitBox } from "features/vote/submitPick";
import { ChoiceContentBox } from "features/vote/submitPick";
import { LoginForm } from "features/authentication/login";
import { TitleBar } from "features/vote/readTitle";
import { useDialog } from "shared/hooks/useDialog";
import { Button } from "shared/ui/Button";

import styles from "./voteCard.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  voteList: VoteDto[] | undefined;
}

export const VoteCardList = ({ voteList = [], className, ...props }: Props) => {
  return (
    <div {...props} className={`${className}`}>
      {voteList.map(
        (vote: VoteDto, idx: number) =>
          vote && <VoteCard key={idx} vote={vote} />
      )}
    </div>
  );
};

export const VoteCard = ({ vote }: { vote: VoteDto }) => {
  const [isOpenSubmit, setIsOpenSubmit] = useState<boolean>(false);

  const [loginForm, openLoginForm] = useDialog(<LoginForm />);
  const user = useQueryClient().getQueryData([
    "user",
  ]) as User;

  const { data: userPick } = useReadUserPick(vote._id);
  const { data: choiceCount } = useReadChoiceCount(vote._id, vote.choice);
  const { mutate: mutateLike } = useUpdateLike(vote._id);
  const { mutate: mutatePick } = useUpdateUserPick(vote._id);
  
  const isClickLike = useMemo(
    () => (user?._id ? vote.like_member.includes(user?._id) : false),
    [user?._id, vote.like_member]
  );

  const mutatePickHandler = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (!user?.name) return openLoginForm();

      setIsOpenSubmit((prev) => !prev);

      const formChoiceData = new FormData(event.currentTarget.form!).getAll(
        "choice"
      ) as VoteFormDto["choice"];
      console.log(formChoiceData);

      //formData가 있을 때만 서버에 전송
      if (formChoiceData.length !== 0) mutatePick(formChoiceData);
    },
    [user?.name, openLoginForm, setIsOpenSubmit, mutatePick]
  );

  const mutateLikeHandler = useCallback(() => {
    if (!user?.name) {
      openLoginForm();
      return;
    }

    mutateLike();
  }, [user?.name, openLoginForm, mutateLike]);

  return (
    <form className={`${styles.cardContainer}`}>
      <TitleBar
        picture={vote.owner.picture}
        title={vote.title}
        start_time={vote.start_time}
      />

      <ChoiceSubmitBox
        isOpenSubmit={isOpenSubmit}
        name={user?.name}
        choice={userPick}
        max_choice={vote.max_choice}
        onClickSubmit={mutatePickHandler}
      />
      <ChoiceContentBox
        isOpenSubmit={isOpenSubmit}
        choiceListIncludedCount={choiceCount}
        choice={vote.choice}
        max_choice={vote.max_choice}
      />

      <section className={styles.otherInfoBox}>
        <UpdateLike
          like={vote.like}
          isUserLike={isClickLike}
          onClick={mutateLikeHandler}
        />
        <Participant participant={vote.participant} />
        <Button className={styles.openDetailButton}>자세히</Button>
      </section>
      {loginForm}
    </form>
  );
};
