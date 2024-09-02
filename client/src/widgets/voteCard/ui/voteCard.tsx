import { HTMLAttributes, useCallback, useMemo, useState } from "react";

import { ChoiceDto, useUpdateUserPick } from "entities/vote/choice";
import { type VoteDto } from "entities/vote/vote";
import { useUserFetch } from "entities/user";
import { useUpdateLike } from "entities/vote/likes";
import { VoteCover } from "features/vote/cover";
import { UpdateLike } from "features/vote/updateLike";
import { Participant } from "features/vote/readParticipants";
import { ChoiceSubmitBox } from "features/vote/submitPick";
import { ChoiceContentBox } from "features/vote/submitPick";
import { TitleBar } from "features/vote/title";
import { Button } from "shared/ui/Button";

import styles from "./voteCard.module.css";
import { Link } from "react-router-dom";

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

  const { data: user } = useUserFetch();
  const { mutate: mutateLike } = useUpdateLike(vote._id);
  const { mutate: mutatePick } = useUpdateUserPick(vote._id);

  const isClickLike = useMemo(
    () => (user?._id ? vote.likes.includes(user?._id) : false),
    [user, vote.likes]
  );

  const myPick = useMemo(
    () =>
      vote.participants.find(
        (participant) => participant.user._id === user?._id
      )?.pick,
    [user, vote.participants]
  );
  
  const mutatePickHandler = useCallback(
    (event: React.MouseEvent<HTMLInputElement>) => {
      event.preventDefault();
      if (!user?.name || !event.currentTarget.form) return;

      setIsOpenSubmit((prev) => !prev);

      const formData = new FormData(event.currentTarget.form);
      const choice = formData.getAll("choice") as ChoiceDto["content"][];

      //formData가 있을 때만 서버에 전송
      if (choice.length !== 0) mutatePick(choice);
    },
    [user?.name, setIsOpenSubmit, mutatePick]
  );

  const mutateLikeHandler = useCallback(() => {
    if (!user?.name) return;

    mutateLike();
  }, [user?.name, mutateLike]);

  return (
    <div className={`${styles.cardContainer}`}>
      <TitleBar
        picture={vote.owner.picture}
        title={vote.title}
        start_time={vote.start_time}
      />

      <form className={styles.choiceBox}>
        {user?.picture && (
          <VoteCover
            picture={user.picture}
            choice={vote.choice}
            className={styles.voteCover}
          />
        )}

        <ChoiceSubmitBox
          isOpenSubmit={isOpenSubmit}
          name={user?.name}
          myPick={myPick}
          max_choice={vote.max_choice}
          onClickSubmit={mutatePickHandler}
        />
        <ChoiceContentBox
          isOpenSubmit={isOpenSubmit}
          choice={vote.choice}
          max_choice={vote.max_choice}
        />
      </form>

      <section className={styles.otherInfoBox}>
        <UpdateLike
          like={vote.likes.length}
          isUserLike={isClickLike}
          onClick={mutateLikeHandler}
        />
        <Participant participant={vote.participants.length} />
        <Button className={styles.openDetailButton}>
          <Link to={`vote/${vote._id}`}>자세히</Link>
        </Button>
      </section>
    </div>
  );
};
