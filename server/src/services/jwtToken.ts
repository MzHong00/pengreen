import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

import config from "../config";
import { User } from "../types/user";
import { mongodbFindOne } from "../data-access/mongodb";

//로그인하여 token을 발급
export const issueToken = (payload: User) => {
  try {
    const accessToken = jwt.sign(payload, config.jwtAccessKey as string, {
      expiresIn: config.jwtExpiredSecond,
      issuer: "access issuer",
    });

    const refreshToken = jwt.sign(
      { _id: payload._id.toString() },
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
  } catch (error) {
    throw new Error(`Issue Token Error: ${error}`);
  }
};

export const reissueToken = async (refreshToken: string | undefined) => {
  if (!refreshToken) return;

  try {
    const payload = jwt.verify(
      refreshToken,
      config.jwtRefreshKey as string
    ) as any;
    const userId = payload._id;

    const user = await mongodbFindOne("user", {
      _id: ObjectId.createFromHexString(userId),
    });

    if (!user) throw new Error("User not found or invalid");

    const accessToken = jwt.sign(user, config.jwtAccessKey as string, {
      expiresIn: config.jwtExpiredSecond,
      issuer: "access issuer",
    });

    return accessToken;
  } catch (error) {
    throw new Error(`ReissueToken Error: ", ${error}`);
  }
};
