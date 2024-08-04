import axios from "axios";
import { type Request, type Response } from "express";
import { OAuth2Client } from "google-auth-library";

import { keys } from "../../config/oauth2.keys";

const oAuth2Client = new OAuth2Client(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

export const google_signin = (req: Request, res: Response) => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  res.status(200).send(authorizeUrl);
};

export const google_redirect = async (req: Request, res: Response) => {
  try {
    const code = req.body.code;
    const r = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(r.tokens);

    const googleApi = "https://www.googleapis.com/oauth2/v2/userinfo";

    const redirect = await axios.get(googleApi, {
      headers: {
        Authorization: `Bearer ${oAuth2Client.credentials.access_token}`,
      },
    });

    res.status(200).send(redirect.data);
  } catch (error) {
    console.log(error);
  }
};

export const google_signout = (req: Request, res: Response) => {
  try {
    oAuth2Client.revokeCredentials((err, body) => {
      console.log(err, body);
    });
  } catch (error) {
    console.log("로그아웃 에러");
  }
};
