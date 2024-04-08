import axios from 'axios';
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//구글 로그인 폼 호출
export const fetchGoogleForm = async () => {
  console.log(process.env.REACT_APP_API_ROOT);
  const res = await axios.get(`https://${process.env.REACT_APP_API_ROOT}/api/account/google/signin`);
  return res.data;
}

//구글 로그인이 완료되면 redirect로 code를 받음
//code로 서버에 로그인 후, 토큰을 받아 브라우저에 쿠키 생성
export const fetchToken = async (redirect_code) => {
  try {
    const user = await axios.post(`https://${process.env.REACT_APP_API_ROOT}/api/account/google/redirect`, {
      code: redirect_code
    });

    const token = await axios.post(`https://${process.env.REACT_APP_API_ROOT}/api/account/signin`, user.data);

    cookies.set('access_token', token.data.accessToken, {
      path: '/',
      secure: true,
      httponly: true,
    });

    cookies.set('refresh_token', token.data.refreshToken, {
      path: '/',
      secure: true,
      httponly: true,
    });

  } catch (error) {
    console.error("fetchAccess_token error: ", error);
  }
}