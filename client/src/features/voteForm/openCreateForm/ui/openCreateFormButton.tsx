import { FaPlus } from "react-icons/fa6";

import VoteForm from "features/voteForm/generateVote/ui/voteForm/voteForm";
import { useDialog } from "shared/hooks/useDialog";

export const OpenCreateFormButton = () => {
  const [voteForm, openVoteForm] = useDialog(<VoteForm />);

  return (
    <h2 className="flex items-center gap-3">
      <span>My Votes</span>
      <FaPlus
        color="rgb(171 209 213)"
        className="border-2 border-blue-200 rounded-lg shadow hover:shadow-inner cursor-pointer"
        onClick={openVoteForm}
      />
      {voteForm}
    </h2>
  );
};
