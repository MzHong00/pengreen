import axios from "shared/api/base";
import { User } from "../model/types";

export const signup = async (user: User): Promise<void> => {
  await axios.post(`api/account/signup`, user);
};
