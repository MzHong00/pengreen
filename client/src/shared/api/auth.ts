import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

//브라우저에 쿠키를 갖고 서버에 요청하여 계정 정보를 가져옴
export const fetchUser = async () => {
    try {
        const accessToken = cookies.get('access_token');
        
        if (!accessToken) {
            console.log("엑세스 토큰 없음");
            return "";
        }

        let user = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/account/auth`, {}, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        //Access Token이 만료되었다면 Refresh Token을 사용하여 재발급
        if (user.data === 'expired') {
            const refreshToken = cookies.get('refresh_token');
            const reissuedToken = await reissueToken(refreshToken);

            cookies.set('access_token', reissuedToken, {
                path: '/',
                secure: true,
                httpOnly: true
            });

            user = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/account/auth`, {}, {
                headers: {
                    'Authorization': `Bearer ${reissuedToken}`
                }
            });
        }
        
        return user.data;
    } catch (error) {
        console.error("fetchUser error: ", error);
    }
}

const reissueToken = async (refreshToken: string) => {
    try {
        if (!refreshToken) {
            throw new Error('Refresh token is missing');
        }

        const reissueResponse = await axios.post(`${process.env.REACT_APP_API_ROOT}/api/account/reissue`, {}, {
            headers: {
                'Authorization': `Bearer ${refreshToken}`
            }
        });

        return reissueResponse.data;
    } catch (error) {
        console.error("reissueToken error: ", error);
        throw error;
    }
}

export const fetchLogout = () => {
    try {
        cookies.remove('access_token');
        cookies.remove('refresh_token');
        window.location.reload();
    } catch (error) {
        console.error("로그인 상태가 아닙니다");
    }
}
