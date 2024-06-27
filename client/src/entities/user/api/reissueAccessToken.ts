import axios from "axios";

export const reissueAccessToken = async (refreshToken: string) => {
  try {
    if (!refreshToken) {
      throw new Error("Refresh token is missing");
    }

    const reissueResponse = await axios.post(
      `${process.env.REACT_APP_API_ROOT}/api/account/reissue`,
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );

    return reissueResponse.data;
  } catch (error) {
    console.error("reissueToken error: ", error);
    throw error;
  }
};
