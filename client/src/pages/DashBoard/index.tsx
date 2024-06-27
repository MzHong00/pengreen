import { useUserFetch } from "entities/user";
import { useReadVoteListByOwner } from "entities/vote";
import { VoteCardList } from "widgets/VoteCardList";
import { OpenVoteFormButton } from "widgets/VoteForm";

export default function Dashboard() {
  const { data: user } = useUserFetch();
  const { data: votes } = useReadVoteListByOwner(user?._id);

  return (
    <div className="text-xl font-sans font-semibold">
      <section className="h-160">
        <OpenVoteFormButton />
        <VoteCardList votes={votes} className="flex"/>
      </section>
      <h2>
        <span>Activity</span>
      </h2>
    </div>
  );
}
