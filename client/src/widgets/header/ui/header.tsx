import { useUserFetch } from "entities/user";
import { LoginForm } from "features/authentication/login";
import { ProfilesDetail } from "widgets/profilesDetail";
import { ProfilesCard } from "widgets/profilesCard";
import { useDialog } from "shared/hooks/useDialog";

import styles from "./header.module.css";
import { VoteForm } from "widgets/VoteForm";
import { RoundButton } from "shared/ui/RoundButton";

export function LayoutHeader() {
  const { data: user } = useUserFetch();

  const [loginForm, openLoginForm] = useDialog(<LoginForm />);
  const [profiles, openProfiles] = useDialog(<ProfilesDetail />);
  const [voteForm, openVoteForm] = useDialog(
    user ? <VoteForm /> : <LoginForm />
  );
  
  return (
    <header className={styles.layoutHeader}>
      <span className="font-bold text-2xl text-gray-500">pengreen</span>
      <div className={styles.headerRightSection}>
        {user ? (
          <>
            <RoundButton
              onClick={openVoteForm}
              className={`${styles.openFormButton} hover:bg-gray-100`}
            >
              투표 생성
            </RoundButton>
            <ProfilesCard onClick={openProfiles} picture={user.picture} />
            {voteForm}
            {profiles}
          </>
        ) : (
          <>
            <ProfilesCard onClick={openLoginForm} />
            {loginForm}
          </>
        )}
      </div>
    </header>
  );
}
