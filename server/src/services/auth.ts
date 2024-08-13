import jwt from "jsonwebtoken";

import config from "../config";
import { type User } from "../types/user";
import { issueToken } from "./jwtToken";
import { mongodbFindOne, mongodbInsert } from "../data-access/mongodb";

export const signin = async (userData: User) => {
  try {
    const isGuest = await isUserGuest(userData);
    if (isGuest) await signup(userData);

    const user = await mongodbFindOne("user", { email: userData.email });
    const token = issueToken(user);

    return token;
  } catch (error) {
    throw new Error("Login Error");
  }
};

export const getUserByToken = (accessToken: string | undefined) => {
  if (!accessToken) return;

  try {
    const user = jwt.verify(accessToken, config.jwtAccessKey as string) as User;

    return user;
  } catch (error) {
    console.log(`${(error as jwt.TokenExpiredError).expiredAt}`);
    return undefined;
  }
};

//회원가입하여 사용자 DB에 추가
export const signup = async (user: User): Promise<void> => {
  try {
    await mongodbInsert<User>("user", user);
  } catch (error) {
    throw new Error("Signup error");
  }
};

//boolean, 사용자 DB에 사용자가 존재하는지 여부
export const isUserGuest = async (user: User): Promise<boolean> => {
  try {
    const data = await mongodbFindOne(
      "user",
      { email: user.email },
      { projection: { _id: 1 } }
    );

    return !data;
  } catch (error) {
    throw new Error("isUserGuest Check Error");
  }
};
