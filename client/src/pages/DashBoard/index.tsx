import { useReadVoteListByOwner } from "entities/vote";
import { useUserFetch } from "entities/login";
import { OpenCreateFormButton } from "features/voteForm/openCreateForm";
import { VoteCardList } from "widgets/VoteCardList";

export default function Dashboard() {
  const { data: user } = useUserFetch();
  const { data: votes } = useReadVoteListByOwner(user?._id);

  return (
    <div className="text-xl font-sans font-semibold">
      <section className="h-160">
        <OpenCreateFormButton />
        <VoteCardList votes={votes} className="flex"/>
      </section>
      <h2>
        <span>Activity</span>
      </h2>
    </div>
  );
}
