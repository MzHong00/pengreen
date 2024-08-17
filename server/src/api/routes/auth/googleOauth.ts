import { Request, Response, Router } from "express";

import {
  googleOauthForm,
  googleOauth,
} from "../../../services/googleOauth";
import { login } from "../../../services/auth";

const route = Router();

export default (app: Router) => {
  app.use("/google", route);

  route.get("/form", (_, res: Response) => {
    const googleFormUrl = googleOauthForm();

    res.status(200).send(googleFormUrl);
  });

  route.post("/login", async (req: Request, res: Response) => {
    try {
      const { code } = req.body;

      const googleData = await googleOauth(code);
      const { accessToken, refreshToken } = await login(googleData);

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
        .send("Cookies set");
    } catch (error) {
      res.status(500).send(`Login Error: ${error}`);
    }
  });
};
