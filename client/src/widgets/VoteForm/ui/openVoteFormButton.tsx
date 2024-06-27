import { FaPlus } from "react-icons/fa6";

import { useDialog } from "shared/hooks/useDialog";
import { Button } from "shared/ui/Button";
import { VoteForm } from "..";

export const OpenVoteFormButton = () => {
  const [voteForm, openVoteForm] = useDialog(<VoteForm />);

  return (
    <Button>
      <FaPlus
        color="rgb(171 209 213)"
        className="border-2 border-blue-200 rounded-lg shadow hover:shadow-inner cursor-pointer"
        onClick={openVoteForm}
      />
      {voteForm}
    </Button>
  );
};
