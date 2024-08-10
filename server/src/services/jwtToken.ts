import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import config from "../config";
import { User } from "../types/user";
import {  mongodbFindOne } from "../data-access/mongodb";

const ACCESS_TOKEN_EXPIRES = "10s";

export const tokenAuth = (accessToken: string) => {
  try {
    return jwt.verify(accessToken, config.jwtAccessKey as string);
  } catch (error) {
    console.log((error as jwt.TokenExpiredError).expiredAt)
  }
};

//로그인하여 token을 발급
export const issueToken = (payload: User) => {
  const accessToken = jwt.sign(payload, config.jwtAccessKey as string, {
    expiresIn: ACCESS_TOKEN_EXPIRES,
    issuer: "access issuer",
  });

  const refreshToken = jwt.sign(
    { _id: payload._id.toString()},
    config.jwtRefreshKey as string,
    {
      expiresIn: "24h",
      issuer: "refresh issuer",
    }
  );

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };
};

export const reissueToken = async (refreshToken: string | undefined) => {
  if (!refreshToken) return;

  try {
    const payload = jwt.verify(refreshToken, config.jwtRefreshKey as string) as any;
    const userId = payload._id;

    const user = await mongodbFindOne("user", {
      _id: ObjectId.createFromHexString(userId)
    });

    if (!user) throw new Error("User not found or invalid");

    const accessToken = jwt.sign(user, config.jwtAccessKey as string, {
      expiresIn: ACCESS_TOKEN_EXPIRES,
      issuer: "access issuer",
    });

    return accessToken;
  } catch (error) {
    console.log("reissueToen 에러", error);
  }
};
