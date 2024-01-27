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

    const token = await axios.post('http://localhost:5001/api/account/auth/google', {
      user: user
    })

    setCookie('access_token', token.data.accessToken, {
      path: '/',
      secure: true,
      maxAge: 3000
    })

    setCookie('refresh_token', token.data.refreshToken, {
      path: '/',
      secure: true,
      maxAge: 3000
    })

    // window.location.href = 'http://example.com/auth/google';
    // return
  } catch (error) {
    console.error("fetchAccess_token error: ", error);
  }
}

const fetchUser = async () => {
  // const access_token = getCookie('access_token');
  
  // try {
  //   const user = await axios.post('http://localhost:5001/api/account/google_userinfo', {
  //     access_token: access_token.data
  //   })

  //   return user.data;
  // } catch (error) {
  //   console.error("fetchUser error: ", error);
  // }
}

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