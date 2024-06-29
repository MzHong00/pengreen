import { FaPlus } from "react-icons/fa6";

import { VoteForm } from "widgets/VoteForm";
import { useDialog } from "shared/hooks/useDialog";
import { Button } from "shared/ui/Button";
import { useUserFetch } from "entities/user";
import { LoginForm } from "features/authentication/login";

export const OpenVoteForm = () => {
  const { data: user } = useUserFetch();
  const [voteForm, openVoteForm] = useDialog(
    user ? <VoteForm /> : <LoginForm />
  );

  return (
    <>
      <Button>
        <FaPlus
          color="rgb(171 209 213)"
          className="border-2 border-blue-200 rounded-lg shadow hover:shadow-inner"
          onClick={openVoteForm}
        />
      </Button>
      {voteForm}
    </>
  );
};
