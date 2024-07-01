import { Logo } from "../Logo/logo";
import { ProfilesCard } from "../ProfilesCard/profilesCard";
import { useUserFetch } from "entities/user";
import { LoginForm } from "features/authentication/login";
import { OpenFormButton } from "features/voteForm/openForm";
import { ProfilesDetail } from "widgets/profilesDetail";
import { useDialog } from "shared/hooks/useDialog";

import styles from './LayoutHeader.module.css'

export function LayoutHeader() {
  const { data: user } = useUserFetch();

  const [loginForm, openLoginForm] = useDialog(<LoginForm />);
  const [profiles, openProfiles] = useDialog(<ProfilesDetail />);

  return (
    <header className={styles.layoutHeader}>
      <Logo />
      <div className={styles.headerRightSection}>
        {user ? (
          <>
            <OpenFormButton />
            <ProfilesCard onClick={openProfiles} picture={user.picture} />
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
