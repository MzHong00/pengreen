import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const fetchLogout = () => {
  try {
    cookies.remove("access_token");
    cookies.remove("refresh_token");
    window.location.reload();
  } catch (error) {
    console.error("로그인 상태가 아닙니다");
  }
};
