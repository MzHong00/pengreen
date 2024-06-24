import { oauthType } from "..";
import { Button } from "shared/ui/Button";

import styles from "./loginForm.module.css";

export function LoginForm() {
  const oauth = oauthType();

  return (
    <div className={styles.formContainer}>
      <h1>
        <span className={styles.formTitle}>환영합니다</span>
      </h1>
      <div className={styles.oauthTypeList}>
        {oauth.map((oauth) => (
          <Button
            key={oauth.name}
            onClick={oauth.handler}
            className={`${styles.oauthItemBox} ${oauth.tailwind}`}
          >
            {oauth.componentImg}
            {oauth.name + "계정으로 로그인"}
          </Button>
        ))}
      </div>
      <p className={styles.otherDescription}>
        로그인하여 다양한 서비스들을 누려보세요!
      </p>
    </div>
  );
}
