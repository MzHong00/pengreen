import { Router } from "express";

import googleOauth from "./googleOauth";
import { getUser, signin } from "../../../services/auth";
import { User } from "../../../types/user";
import { reissueToken } from "../../../services/jwtToken";

const route = Router();

export default (app: Router) => {
  app.use("/account", route);

  googleOauth(route);

  route.post("/user", (req, res) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) return;
    
    // "Bearer <token>" 형식으로 전송된 토큰에서 "Bearer " 부분을 제거하여 토큰을 추출합니다.
    const accessToken = authorizationHeader.split(" ")[1];

    if (!accessToken) return res.status(400).send("Token is missing");

    const user = getUser(accessToken);
    if (!user) res.status(401).send("Token expired");

    res.status(200).send(user);
  });

  route.post("/login", async (req, res) => {
    const userData = req.body as User;

    const token = await signin(userData);

    res.status(200).send(token);
  });

  route.post("/reissue", async (req, res) => {
    const authorizationHeader = req.headers["authorization"];
    const refreshToken = authorizationHeader?.split(" ")[1];

    const accessToken = await reissueToken(refreshToken);

    if (!accessToken) {
      res.status(401).send("Access token is missing");
      return;
    }

    res.status(201).cookie("access_token", accessToken);
    res.status(200).send("reissue access token successful");
  });
};
