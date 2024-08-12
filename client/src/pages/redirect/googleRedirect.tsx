import { useEffect } from "react";

import { googleOuathLogin } from "entities/oauth";

export function Redirect() {
  useEffect(() => {
    const getToken = async () => {
      const params = new URLSearchParams(window.location.search);
      const name = params.get("code");

      await googleOuathLogin(name);
      window.opener.postMessage("login");
      window.close();
    };

    getToken();
  }, []);

  return <div>로그인중....</div>;
}
