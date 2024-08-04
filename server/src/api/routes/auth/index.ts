import { Router } from "express";

import googleOauth from "./googleOauth";
import { tokenAuth, reissueToken, signin } from "../../../services/auth/auth";

const route = Router();

export default (app: Router) => {
  app.use("/account", route);

  route.post("/auth", tokenAuth);
  route.post("/signin", signin);
  route.post("/reissue", reissueToken);

  googleOauth(route);
};
