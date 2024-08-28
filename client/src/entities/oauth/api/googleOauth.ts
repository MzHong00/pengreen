import axios from "shared/api/base";

import { type User } from "entities/user";
import { type UserDetail } from "entities/user/model/types";

//구글 로그인 폼 호출
export const fetchGoogleForm = async () => {
  const res = await axios.get(`api/account/google/form`);
  return res.data;
};

//구글 로그인이 완료되면 redirect로 code를 받음
//code로 서버에 로그인 후, 토큰을 받아 브라우저에 쿠키 생성
export const googleOuathLogin = async (): Promise<Omit<User, keyof UserDetail> | undefined> => {
  const params = new URLSearchParams(window.location.search);
  const redirect_code = params.get("code");

  if (!redirect_code) return;

  try {
    const googleDate = await axios.post(`api/account/google/login`, {
      code: redirect_code,
    });

    return googleDate.data as Omit<User, keyof UserDetail>;
  } catch (error) {
    console.error("fetchAccess_token error: ", error);
  }
};
