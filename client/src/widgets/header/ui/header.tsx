import { useUserFetch } from "entities/user";
import { LoginForm } from "features/authentication/login";
import { ProfilesDetail } from "widgets/profilesDetail";
import { ProfilesCard } from "widgets/profilesCard";
import { VoteForm } from "widgets/VoteForm";
import { useDialog } from "shared/hooks/useDialog";
import { RoundButton } from "shared/ui/RoundButton";

import styles from "./header.module.css";

export function LayoutHeader() {
  const { data: user } = useUserFetch();

  const [loginForm, openLoginForm] = useDialog(<LoginForm />);
  const [profiles, openProfiles] = useDialog(<ProfilesDetail />);
  const [voteForm, openVoteForm] = useDialog(
    user ? <VoteForm /> : <LoginForm />
  );

  return (
    <header className={styles.layoutHeader}>
      <span className={styles.logoTitle}>pengreen</span>
      <div className={styles.headerRightSection}>
        {user ? (
          <>
            <RoundButton
              onClick={openVoteForm}
              className={styles.openFormButton}
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
