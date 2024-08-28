import { FcGoogle } from "@react-icons/all-files/fc/FcGoogle";
import { RiKakaoTalkFill } from "@react-icons/all-files/ri/RiKakaoTalkFill";
import { FaArrowRight } from "@react-icons/all-files/fa/FaArrowRight";

import { fetchGoogleForm } from "entities/oauth";
import { Button } from "shared/ui/Button";

import styles from "./loginForm.module.css";

export function LoginForm() {
  const onClickGoogle = async () => {
    const googleAuthUrl = await fetchGoogleForm();
    window.open(
      googleAuthUrl,
      "",
      "width=500, height=700, left=800, top=300, scrollbars=yes"
    );
  };

  return (
    <div className={styles.formContainer}>
      <header>
        <h1>환영합니다</h1>
      </header>

      <main className={styles.formMain}>
        <form className={styles.sectionContainer}>
          <label className={styles.loginBox}>
            Email Address
            <input className={styles.loginInput} placeholder="Email" />
            <Button className={styles.sendEmailButton}>
              <FaArrowRight color="white" size={22} />
            </Button>
          </label>
        </form>
        <div className={styles.sectionContainer}>
          <div className={styles.sectionLine}>
            <hr />
            <span className={styles.sectionText}>SNS Login</span>
          </div>
          <div className={styles.oauthItemBox}>
            <Button onClick={onClickGoogle} className={styles.googleColor}>
              <FcGoogle size={26} />
            </Button>
            <Button className={styles.kakaoColor}>
              <RiKakaoTalkFill size={26} />
            </Button>
          </div>
        </div>
      </main>

      <footer className={styles.formFooter}>
        <p>로그인하여 다양한 서비스들을 누려보세요!</p>
      </footer>
    </div>
  );
}
