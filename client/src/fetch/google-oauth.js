import axios from 'axios';
import {
  setCookie, getCookie
} from '../config/cookie';

//구글 로그인 폼 호출
const fetchLogin = async () => {
  const res = await axios.get('http://localhost:5001/api/account/google/signin');

  return res.data;
}

//구글 로그인이 완료되면 redirect로 code를 받음
//code로 서버에 로그인 후, 토큰을 받아 브라우저에 쿠키 생성
const fetchAccess_token = async (code) => {
  try {
    const user = await axios.post('http://localhost:5001/api/account/google/redirect', {
      code: code
    });

    const token = await axios.post('http://localhost:5001/api/account/signin', user.data);

    setCookie('access_token', token.data.accessToken, {
      path: '/',
      secure: true,
      httponly: true,
    });

    setCookie('refresh_token', token.data.refreshToken, {
      path: '/',
      secure: true,
      httponly: true,
    });

  } catch (error) {
    console.error("fetchAccess_token error: ", error);
  }
}

//브라우저에 쿠키를 갖고 서버에 요청하여 계정 정보를 가져옴
const fetchUser = async () => {
  try {
    const accessToken = getCookie('access_token');
    let user;

    if (!accessToken) {
      throw new Error('Access token is missing');
    }

    user = await axios.post('http://localhost:5001/api/account/auth', {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    //Access Token이 만료되었다면 Refresh Token을 사용하여 재발급
    if (user.data === 'expired') {
      const refreshToken = getCookie('refresh_token');
      const reissuedToken = await reissueToken(refreshToken);

      setCookie('access_token', reissuedToken, {
        path: '/',
        secure: true,
        httponly: true
      });

      user = await axios.post('http://localhost:5001/api/account/auth', {}, {
        headers: {
          'Authorization': `Bearer ${reissuedToken}`
        }
      });
    }

    return user.data;
  } catch (error) {
    console.error("fetchUser error: ", error);
  }
}

const reissueToken = async (refreshToken) => {
  try {
    if (!refreshToken) {
      throw new Error('Refresh token is missing');
    }

    const reissueResponse = await axios.post('http://localhost:5001/api/account/reissue', {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    });

    return reissueResponse.data;
  } catch (error) {
    console.error("reissueToken error: ", error);
    throw error;
  }
}


//미구현
const fetchLogout = async () => {
  try {
    await axios.get('http://localhost:5001/api/account/signout');
  } catch (error) {
    console.error("error: ", error);
  }
}

export {
  fetchLogin, fetchAccess_token, fetchUser, fetchLogout
}