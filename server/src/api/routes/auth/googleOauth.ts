import { Request, Response, Router } from "express";

import {
  googleLogin,
  googleLogout,
  googleRedirect,
} from "../../../services/googleOauth";
import { signin } from "../../../services/auth";

const route = Router();

export default (app: Router) => {
  app.use("/google", route);

  route.get("/login", (_, res: Response) => {
    const googleFormUrl = googleLogin();

    res.status(200).send(googleFormUrl);
  });

  route.get("/logout", () => {
    googleLogout();
  });

  route.post("/redirect", async (req: Request, res: Response) => {
    const { code } = req.body;

    const googleData = await googleRedirect(code);
    const { accessToken, refreshToken } = await signin(googleData);

    res.status(200).cookie('access_token', accessToken);
    res.status(200).cookie('refresh_token', refreshToken);

    res.status(200).send('Cookies set');
  });
};
