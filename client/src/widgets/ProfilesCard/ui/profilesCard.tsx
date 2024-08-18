import { MouseEventHandler } from "react";

import { Button } from "shared/ui/Button";

import styles from "./profilesCard.module.css";

interface Props {
  onClick?: MouseEventHandler;
  picture?: string;
}

export function ProfilesCard({ onClick, picture }: Props) {
  return (
    <div className={styles.container}>
      <Button className={styles.button} onClick={onClick}>
        {picture ? (
          <img src={picture} alt="" className={styles.picture} />
        ) : (
          <span>로그인</span>
        )}
      </Button>
    </div>
  );
}
