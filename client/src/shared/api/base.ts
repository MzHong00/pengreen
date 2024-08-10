import axios, { AxiosStatic } from "axios";
import { reissueAccessToken } from "entities/user";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_ROOT,
  headers: { "Content-type": "application/json" },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = cookies.get("access_token");
    if (!accessToken) throw new Error("access token is missing");

    if (!config.url?.includes("/reissue"))
      config.headers["authorization"] = `Bearer ${accessToken}`;
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      console.log("404 페이지로 넘어가야 함!");
    }

    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        await reissueAccessToken();
      }

      const accessToken = cookies.get("access_token");

      error.config.headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await axios.request(error.config);

      return response;
    }
    return Promise.reject(error);
  }
);

export default instance as AxiosStatic;