import { useUserFetch } from "entities/user";
import { LoginForm } from "features/authentication/login";
import { VoteForm } from "widgets/VoteForm";
import { useDialog } from "shared/hooks/useDialog";
import { RoundButton } from "shared/ui/RoundButton";

import styles from './openFormButton.module.css'

export const OpenFormButton = () => {
  const { data: user } = useUserFetch();
  const [voteForm, openVoteForm] = useDialog(
    user ? <VoteForm /> : <LoginForm />
  );

  return (
    <>
      <RoundButton onClick={openVoteForm} className={`${styles.openFormButton} hover:bg-gray-100`}>
        투표 생성
      </RoundButton>
      {voteForm}
    </>
  );
};
