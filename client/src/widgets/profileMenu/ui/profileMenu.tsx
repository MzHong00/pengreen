import { forwardRef, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

import { User } from "entities/user";
import { logoutActions } from "features/authentication/logout";
import { VoteForm } from "widgets/VoteForm";
import { useDialog } from "shared/hooks/useDialog";
import { Button } from "shared/ui/Button";

import styles from "./profileMenu.module.css";

interface Props extends HTMLAttributes<HTMLDivElement>, User {}

export const ProfileMenu = forwardRef<HTMLDivElement, Partial<Props>>(
  ({ picture, name, email, ...props }, ref) => {
    const [voteForm, openVoteForm] = useDialog(<VoteForm />);

    return (
      <nav ref={ref} {...props}>
        <Link to="/user" className={styles.profileMenuContainer}>
          <img alt="profiles" src={picture} className={styles.profilePicture} />
          <div>
            <b>{name}</b>
            <p>{email}</p>
          </div>
        </Link>
        <Button className={styles.menuButton} onClick={logoutActions}>
          로그아웃
        </Button>
        <hr />
        <Link to="/dashboard">내 투표</Link>
        <Button className={styles.menuButton} onClick={openVoteForm}>
          투표 생성
        </Button>
        {voteForm}
      </nav>
    );
  }
);
