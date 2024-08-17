import axios from "shared/api/base";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

import { User } from "../model/types";

export const useUserFetch = () => {
  const access_token = new Cookies().get("access_token");

  return useQuery<User>({
    queryKey: ["user"],
    queryFn: () => getUserByToken(),
    staleTime: 5000,
    enabled: !!access_token,
  });
};

const getUserByToken = async (): Promise<User> => {
  const user = await axios.get(`api/account/user`);

  return user.data;
};
