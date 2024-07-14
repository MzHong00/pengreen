import axios from "axios";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

import { reissueAccessToken } from "./reissueAccessToken";
import { User } from "../model/types";

const cookies = new Cookies();

export const useUserFetch = () => {
    const accessToken = cookies.get("access_token");
    
    return useQuery({
    queryKey: ["user"],
    queryFn: () => fetchLogin(),
    enabled: !!accessToken
  });
};

//브라우저에 쿠키를 갖고 서버에 요청하여 계정 정보를 가져옴
const fetchLogin = async (): Promise<User | undefined> => {
  try {
    const accessToken = cookies.get("access_token");

    if (!accessToken) {
      console.log("엑세스 토큰 없음");
      return;
    }

    let user = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/account/auth`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    //Access Token이 만료되었다면 Refresh Token을 사용하여 재발급
    if (user.data === "expired") {
      const refreshToken = cookies.get("refresh_token");
      const reissuedToken = await reissueAccessToken(refreshToken);

      cookies.set("access_token", reissuedToken, {
        path: "/",
        secure: true,
        httpOnly: true,
      });

      user = await axios.post(
        `${process.env.REACT_APP_API_ROOT}/api/account/auth`,
        {},
        {
          headers: {
            Authorization: `Bearer ${reissuedToken}`,
          },
        }
      );
    }

    return user.data;
  } catch (error) {
    console.error("fetchUser error: ", error);
  }
};
