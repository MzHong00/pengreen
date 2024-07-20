import { HTMLAttributes, useCallback, useMemo, useState } from "react";

import {
  useReadChoiceCount,
  useReadUserPick,
  useUpdateUserPick,
} from "entities/vote/choice";
import { useReadVoteById, type VoteDto } from "entities/vote/vote";
import { type VoteFormDto } from "entities/voteForm";
import { useUserFetch } from "entities/user";
import { useUpdateLikeQuery } from "entities/vote/likes";
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
      {voteList.map((vote: VoteDto, idx: number) => (
        <VoteCard key={idx} vote={vote} />
      ))}
    </div>
  );
};

export function VoteCard({ vote }: { vote: VoteDto }) {
  const [isOpenSubmit, setIsOpenSubmit] = useState<boolean>(false);

  const [loginForm, openLoginForm] = useDialog(<LoginForm />);
  const { data: user } = useUserFetch();
  const { data: searchedVote } = useReadVoteById(vote._id);

  const { mutate: mutateLike } = useUpdateLikeQuery({
    user_id: user?._id,
    vote_id: vote._id,
  });
  const { mutate: mutatePick } = useUpdateUserPick({
    user_id: user?._id,
    vote_id: vote._id,
  });
  const { data: userPick } = useReadUserPick({
    user_id: user?._id,
    vote_id: vote._id,
  });
  const { data: choiceCount } = useReadChoiceCount({
    vote_id: vote._id,
    choiceList: vote.choice,
  });
  const isClickLike = useMemo(() => {
    if (user?._id) {
      return vote.like.includes(user._id);
    }

    return false
  }, [user?._id, vote.like]);

  const mutatePickHandler = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();

      if (!user) {
        openLoginForm();
        return;
      }

      setIsOpenSubmit((prev) => !prev);

      const formChoiceData = new FormData(event.currentTarget.form!).getAll(
        "choice"
      ) as VoteFormDto["choice"];
      console.log(formChoiceData);

      //formData가 있을 때만 서버에 전송
      if (formChoiceData.length !== 0) mutatePick(formChoiceData);
    },
    [user, openLoginForm, setIsOpenSubmit, mutatePick]
  );

  const mutateLikeHandler = useCallback(() => {
    if (!user) {
      openLoginForm();
      return;
    }

    mutateLike();
  }, [user, openLoginForm, mutateLike]);

  return (
    <form className={styles.cardContainer}>
      <TitleBar picture={vote.owner.picture} title={vote.title} />

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
          like={vote.like.length}
          isUserLike={isClickLike}
          onClick={mutateLikeHandler}
        />
        <Participant participant={searchedVote?.participant.length} />
        <Button className={styles.openDetailButton}>자세히</Button>
      </section>
      {loginForm}
    </form>
  );
}
