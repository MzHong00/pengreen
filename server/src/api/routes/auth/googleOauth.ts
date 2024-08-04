import { Router } from "express";

import {
  google_redirect,
  google_signin,
  google_signout,
} from "../../../services/auth/google_oauth";

const route = Router();

export default (app: Router) => {
  app.use("/google", route);

  route.get("/signin", google_signin);
  route.get("/signout", google_signout);
  route.post("/redirect", google_redirect);
};
