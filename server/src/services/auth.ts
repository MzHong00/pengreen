import jwt from "jsonwebtoken";

import config from "../config";
import { issueToken } from "./jwtToken";
import { type User } from "../types/user";
import mongoService from "../loaders/mongodb";

export const login = async (userData: User) => {
  try {
    const user = await mongoService.findOne<User>("user", {
      email: userData.email,
    });

    if (!user || !userData) return console.log("Error: User is not found");

    return issueToken(user);
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
export const signup = async (userData: User) => {
  try {
    const isGuest = await isUserGuest(userData);
    if (!isGuest) throw new Error("Already Our's member");

    const newMember: User = {
      ...userData,
      userType: "regular",
    };

    await mongoService.insert<User>("user", newMember);

    return issueToken(newMember);
  } catch (error) {
    throw new Error("Signup error");
  }
};

//boolean, 사용자 DB에 사용자가 존재하는지 여부
export const isUserGuest = async (user: User): Promise<boolean> => {
  try {
    const data = await mongoService.findOne<User>(
      "user",
      { email: user.email },
      { projection: { _id: 1 } }
    );

    return !data;
  } catch (error) {
    throw new Error("isUserGuest Check Error");
  }
};
