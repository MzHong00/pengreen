import axios from 'shared/api/base';
import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const logoutActions = async () => {
  try {
    cookies.remove("access_token");
    cookies.remove("refresh_token");

    // await axios.get('api/account/google/logout');

    window.location.reload();
  } catch (error) {
    console.error("로그인 상태가 아닙니다");
  }
};
