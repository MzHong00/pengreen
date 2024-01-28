import axios from 'axios';
import {
  setCookie, getCookie
} from '../config/cookie';

const fetchLogin = async () => {
  const res = await axios.get('http://localhost:5001/api/account/google/signin');

  return res.data;
}

const fetchAccess_token = async (code) => {
  try {
    //google 사용자 정보를 가져옴
    const user = await axios.post('http://localhost:5001/api/account/google/redirect', {
      code: code
    });

    const token = await axios.post('http://localhost:5001/api/account/signin', user);

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

const fetchUser = async () => {
  try {
    const accessToken = getCookie('access_token');
    const user = await axios.post('http://localhost:5001/api/account/auth', {}, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    })

    //만약 access token이 만료되었을 경우, 서버에 refresh token을 보내고
    //서버는 refresh 토큰을 받아 access token을 다시 보내준 후 갱신
    if (user.data === 'expired') {
      const refreshToken = getCookie('refresh_token');
      const reissue_accessToken = await axios.post('http://localhost:5001/api/account/reissue', {}, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      })

      setCookie('access_token', reissue_accessToken.data, {
        path: '/',
        secure: true,
      });

      const accessToken = getCookie('access_token');
      const user = await axios.post('http://localhost:5001/api/account/auth', {}, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
      console.log("access토큰 재발급");
      return user.data.name;
    }


    return user.data.name;
  } catch (error) {
    console.error("fetchUser error: ", error);
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