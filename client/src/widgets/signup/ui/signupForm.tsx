import { signup, type User } from "entities/user";
import { type UserDetail } from "entities/user/model/types";
import { regions } from "shared/consts";
import { getFormData } from "shared/helper/getFormData";
import { filterByKeys } from "shared/helper/filterByKeys";
import { Button } from "shared/ui/Button";
import { Logo } from "widgets/logo";

import styles from "./signupForm.module.css";

interface Props {
  OAuthData?: Omit<User, keyof UserDetail>;
}

export const SignupForm = ({ OAuthData }: Props) => {
  const onSubmitSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!OAuthData || !e.currentTarget.form) return;

    const userDetail = getFormData<UserDetail>(e.currentTarget.form);
    const userOAuth = filterByKeys<Omit<User, keyof UserDetail>>(OAuthData, [
      "_id",
      "name",
      "email",
      "picture",
    ]);

    const userData = {
      ...userDetail,
      ...userOAuth,
    };

    if (userData) await signup(userData);

    window.opener.postMessage("login");
    window.close();
  };

  return (
    <form className={styles.form}>
      <Logo style={{ fontSize: "200%" }} />

      <span>가입을 환영합니다!</span>

      <main className={styles.selectBox}>
        <label htmlFor="gender">성별</label>
        <select name="gender" id="gender">
          <option value="" disabled selected>
            선택
          </option>
          <option value="남">남</option>
          <option value="여">여</option>
        </select>

        <label htmlFor="birth">생년월일</label>
        <input type="date" id="birth" name="birth" />

        <label htmlFor="location">지역</label>
        <select name="location" id="location">
          <option value="" disabled>
            선택
          </option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </main>

      <Button
        type="submit"
        onClick={onSubmitSignup}
        className={styles.signupButton}
      >
        가입
      </Button>

      <p className={styles.notifyText}>
        ※ 이 정보는 통계 목적으로만 사용되며, 회원가입 후에도 언제든지 수정이
        가능합니다.
      </p>
    </form>
  );
};
