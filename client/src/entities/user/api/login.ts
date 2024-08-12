import axios from "shared/api/base";
import { Cookies } from "react-cookie";
import { useQuery } from "@tanstack/react-query";

import { User } from "../model/types";

const cookies = new Cookies();

export const useUserFetch = () => {
  const accessToken = cookies.get("access_token");

  return useQuery({
    queryKey: ["user"],
    queryFn: () => getUserByToken(),
    staleTime: 5000,
    enabled: !!accessToken,
  });
};

const getUserByToken = async (): Promise<User> => {
  const user = await axios.get(`api/account/user`);

  return user.data;
};
