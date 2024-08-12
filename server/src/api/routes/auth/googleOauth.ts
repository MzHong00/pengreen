import { Request, Response, Router } from "express";

import {
  googleOauthForm,
  googleLogout,
  getGoogleProfiles,
} from "../../../services/googleOauth";
import { signin } from "../../../services/auth";

const route = Router();

export default (app: Router) => {
  app.use("/google", route);

  route.get("/form", (_, res: Response) => {
    const googleFormUrl = googleOauthForm();

    res.status(200).send(googleFormUrl);
  });

  route.post("/login", async (req: Request, res: Response) => {
    const { code } = req.body;

    const googleData = await getGoogleProfiles(code);
    const { accessToken, refreshToken } = await signin(googleData);
    
    res.status(200).cookie('access_token', accessToken);
    res.status(200).cookie('refresh_token', refreshToken);

    res.status(200).send('Cookies set');
  });
  
  route.get("/logout", () => {
    googleLogout();
  });
};
