import { useEffect, useState } from "react";

import { googleOuathLogin } from "entities/oauth";
import { User } from "entities/user";
import { UserDetail } from "entities/user/model/types";
import { SignupForm } from "widgets/signup";

export function Redirect() {
  const [OAuthData, setOAuthData] = useState<
    Omit<User, keyof UserDetail> | undefined
  >();

  useEffect(() => {
    const getToken = async () => {
      const OAuthData = await googleOuathLogin();
      setOAuthData(OAuthData);

      // 이미 회원가입 상태라면 res.send() 없이 쿠키만 설정 해 주기 때문이다.
      if (!OAuthData) {
        window.opener.postMessage("login");
        window.close();
      }
    };

    getToken();
  }, []);

  if (!OAuthData) return <div>로딩 중....</div>;

  return <SignupForm OAuthData={OAuthData} />;
}
