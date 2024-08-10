import axios from "shared/api/base";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

import { reissueAccessToken } from "./reissueAccessToken";
import { User } from "../model/types";

const cookies = new Cookies();

export const useUserFetch = () => {
  const accessToken = cookies.get("access_token");

  return useQuery({
    queryKey: ["user"],
    queryFn: () => accessTokenAuth(),
    enabled: !!accessToken,
  });
};

//브라우저에 쿠키를 갖고 서버에 요청하여 계정 정보를 가져옴
const getUser = async (): Promise<User | undefined> => {
  try {
    return await accessTokenAuth();
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      await reissueAccessToken();
      return await accessTokenAuth();
    }
  }
};

const accessTokenAuth = async (): Promise<User | undefined> => {
  const user = await axios.post(`api/account/user`);

  return user.data;
};
