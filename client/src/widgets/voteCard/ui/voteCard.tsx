import { useCallback, useMemo, useState } from "react";

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
import { useHover } from "shared/hooks/useHover";
import { Button } from "shared/ui/Button";

import styles from "./voteCard.module.css";

interface Props {
  vote: VoteDto;
}

export function VoteCard({ vote }: Props) {
  const [isOpenSubmit, setIsOpenSubmit] = useState<boolean>(false);
  const { ref: hoverRef, state: isHover } = useHover();
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
    return user?._id ? vote.like.includes(user._id) : false;
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
    <div ref={hoverRef} className={styles.cardContainer}>
      <section className={styles.topSection}>
        <TitleBar picture={vote.owner.picture} title={vote.title}/>
      </section>
      <form>
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
      </form>
      {isHover && (
        <section className="flex justify-between">
          <UpdateLike
            like={vote.like.length}
            isUserLike={isClickLike}
            onClick={mutateLikeHandler}
          />
          <Participant participant={searchedVote?.participant.length} />
          <Button className={styles.openDetailButton}>통계</Button>
        </section>
      )}
      {loginForm}
    </div>
  );
}
