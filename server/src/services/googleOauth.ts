import axios from "axios";
import { OAuth2Client } from "google-auth-library";

import { keys } from "../config/oauth2.keys";

const oAuth2Client = new OAuth2Client(
  keys.web.client_id,
  keys.web.client_secret,
  keys.web.redirect_uris[0]
);

export const googleOauthForm = () => {
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  return authorizeUrl;
};

export const googleLogout = () => {
  try {
    oAuth2Client.revokeCredentials((err, body) => {
      console.log(err, body);
    });
  } catch (error) {
    throw new Error("로그아웃 에러")
  }
};

export const getGoogleProfiles = async (googleCode: string): Promise<any> => {
  try {
    const r = await oAuth2Client.getToken(googleCode);
    oAuth2Client.setCredentials(r.tokens);

    const googleApi = "https://www.googleapis.com/oauth2/v2/userinfo";

    const googleRedirect = await axios.get(googleApi, {
      headers: {
        Authorization: `Bearer ${oAuth2Client.credentials.access_token}`,
      },
    });
    
    return googleRedirect.data;
  } catch (error) {
    throw new Error(`google redirect 에러 ${error}`)
  }
};
