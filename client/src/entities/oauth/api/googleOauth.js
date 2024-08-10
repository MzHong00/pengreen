import axios from 'shared/api/base'

//구글 로그인 폼 호출
export const fetchGoogleForm = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API_ROOT}/api/account/google/login`
  );
  return res.data;
};

//구글 로그인이 완료되면 redirect로 code를 받음
//code로 서버에 로그인 후, 토큰을 받아 브라우저에 쿠키 생성
export const fetchOuathToken = async (redirect_code) => {
  try {
    await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/account/google/redirect`,
      { code: redirect_code },
    );
  } catch (error) {
    console.error("fetchAccess_token error: ", error);
  }
};