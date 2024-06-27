import { PublicVoteFormButton } from "./publicVoteFormButton";

import { useUserFetch } from "entities/user";
import { SetTitleBar } from "features/voteForm/setTitleBar";
import { SelectFormPage } from "features/voteForm/selectFormPage";
import { AddChoice } from "features/voteForm/addChoice";

export const VoteForm = () => {
  const { data: user } = useUserFetch();

  return (
    <form className="w-144 h-full flex flex-col font-medium">
      <div className="h-full flex flex-col justify-between gap-5">
        <SetTitleBar picture={user?.picture} />
        <SelectFormPage />
        <div className={`flex`}>
          <div className={`flex items-center w-full h-full`}>
            <AddChoice />
            <PublicVoteFormButton user={user} />
          </div>
        </div>
      </div>
    </form>
  );
};
