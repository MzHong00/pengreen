import { forwardRef, HTMLAttributes } from "react";
import { Link } from "react-router-dom";

import { User } from "entities/user";
import { logoutActions } from "features/authentication/logout";
import { Button } from "shared/ui/Button";

import styles from "./profileMenu.module.css";

interface Props extends HTMLAttributes<HTMLDivElement>, User {
  onClickCreateVote: () => void;
}

export const ProfileMenu = forwardRef<HTMLDivElement, Partial<Props>>(
  ({ picture, name, email, onClickCreateVote, ...props }, ref) => {
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
        <Button className={styles.menuButton} onClick={onClickCreateVote}>
          투표 생성
        </Button>
      </nav>
    );
  }
);
