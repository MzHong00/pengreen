import axios from "shared/api/base";

//구글 로그인 폼 호출
export const fetchGoogleForm = async () => {
  const res = await axios.get(`api/account/google/form`);
  return res.data;
};

//구글 로그인이 완료되면 redirect로 code를 받음
//code로 서버에 로그인 후, 토큰을 받아 브라우저에 쿠키 생성
export const googleOuathLogin = async (redirect_code: string | null) => {
  if (!redirect_code) return;

  try {
    await axios.post(`api/account/google/login`, { code: redirect_code });
  } catch (error) {
    console.error("fetchAccess_token error: ", error);
  }
};
