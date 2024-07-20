import { useUserFetch } from "entities/user";
import { useReadVoteListByOwner } from "entities/vote/vote";
import { VoteCardList } from "widgets/voteCard";

export default function Dashboard() {
  const { data: user } = useUserFetch();
  const { data: votes } = useReadVoteListByOwner(user?._id);

  return (
    <div>
      <section className="h-160">
        <VoteCardList voteList={votes} className="flex"/>
      </section>
      <h2>
        <span>Activity</span>
      </h2>
    </div>
  );
}
