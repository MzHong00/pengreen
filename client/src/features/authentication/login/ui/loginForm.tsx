import { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

import { fetchGoogleForm } from "entities/oauth";
import { Button } from "shared/ui/Button";

import styles from "./loginForm.module.css";

interface OAuthProvider {
  name: string;
  componentImg: ReactNode;
  handler: () => Promise<void>;
  tailwind: string;
}

const oauthType = (): OAuthProvider[] => {
  return [
    {
      name: "구글",
      componentImg: <FcGoogle />,
      handler: async () => {
        const googleAuthUrl = await fetchGoogleForm();
        window.open(
          googleAuthUrl,
          "",
          "width=400, height=600, left=800, top=300, scrollbars=yes"
        );
      },
      tailwind: "border",
    },
    {
      name: "네이버",
      componentImg: <SiNaver />,
      handler: async () => {},
      tailwind: "bg-[#03c75a] text-white",
    },
    {
      name: "카카오",
      componentImg: <RiKakaoTalkFill />,
      handler: async () => {},
      tailwind: "bg-yellow-300",
    },
  ];
};

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
