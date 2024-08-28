import { Router } from "express";

import googleOauth from "./googleOauth";
import { getUserByToken, signup } from "../../../services/auth";
import { reissueToken } from "../../../services/jwtToken";
import { extractBearerToken } from "../../../utils/expreeHelper";
import { User } from "../../../types/user";

const route = Router();

export default (app: Router) => {
  app.use("/account", route);

  googleOauth(route);

  route.get("/user", (req, res) => {
    const accessToken = extractBearerToken(req);
    if (!accessToken) return res.status(400).send("Token is missing");

    const user = getUserByToken(accessToken);
    if (!user) res.status(401).send("Token expired");

    res.status(200).send(user);
  });

  route.post("/signup", async (req, res) => {
    const userData: User = req.body;
    
    const { accessToken, refreshToken } = await signup(userData);

    res
      .status(200)
      .cookie("access_token", accessToken, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
      })
      .send();
  });

  route.post("/reissue", async (req, res) => {
    const refreshToken = extractBearerToken(req);

    const accessToken = await reissueToken(refreshToken);
    if (!accessToken) return res.status(401).send("Access token is missing");

    res.status(201).cookie("access_token", accessToken);
    res.status(200).send("reissue access token successful");
  });
};
