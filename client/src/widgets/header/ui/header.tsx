import { useUserFetch } from "entities/user";
import { LoginForm } from "features/authentication/login";
import { ProfileMenu } from "widgets/profileMenu";
import { ProfilesCard } from "widgets/profilesCard";
import { Logo } from "widgets/logo";
import { VoteForm } from "widgets/VoteForm";
import { useDialog } from "shared/hooks/useDialog";
import { useModal } from "shared/hooks/useModal";

import styles from "./header.module.css";

export function LayoutHeader() {
  const { data: user } = useUserFetch();
  const [loginForm, openLoginForm] = useDialog(<LoginForm />);
  const [voteForm, openVoteForm] = useDialog(<VoteForm />);
  const {
    ref: voteFormRef,
    isOpen: isOpenVote,
    toggleModal: toggleVoteModal,
  } = useModal();

  return (
    <header className={styles.layoutHeader}>
      <Logo />

      <div className={styles.profileCard}>
        {user ? (
          <>
            <ProfilesCard onClick={toggleVoteModal} picture={user.picture} />
            {isOpenVote && (
              <ProfileMenu
                ref={voteFormRef}
                name={user?.name}
                picture={user?.picture}
                email={user?.email}
                className={styles.profileMenuModal}
                onClickCreateVote={openVoteForm}
              />
            )}
            {voteForm}
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
