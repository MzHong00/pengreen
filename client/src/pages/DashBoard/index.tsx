import { type VoteDto } from "entities/vote";
import { FaPlus } from "react-icons/fa6";

import { useReadVoteListByOwner } from "entities/vote";
import { useUserFetch } from "entities/login";
import VoteForm from "features/voteForm/generateVote/ui/voteForm/voteForm";
import { VoteCard } from "widgets/voteCard";
import { useDialog } from "shared/hooks/useDialog";

export default function Dashboard() {
  const { data: user } = useUserFetch();
  const { data: votes } = useReadVoteListByOwner(user?._id);
  const [voteForm, openVoteForm] = useDialog(<VoteForm />);

  return (
    <div className="text-xl font-sans font-semibold">
      <section className="h-160">
        <h2 className="flex items-center gap-3">
          <span>My Votes</span>
          <FaPlus
            color="rgb(171 209 213)"
            className="border-2 border-blue-200 rounded-lg shadow hover:shadow-inner cursor-pointer"
            onClick={openVoteForm}
          />
        </h2>
        <div className="h-152 grid grid-flow-col grid-rows-voteList">
          {votes?.map((vote: VoteDto, idx: number) => (
            <VoteCard key={idx} vote={vote} />
          ))}
        </div>
      </section>
      {voteForm}
      <h2>
        <span>Activity</span>
      </h2>
    </div>
  );
}
