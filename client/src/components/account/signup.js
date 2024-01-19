import { useEffect, useState } from "react"

import { fetchUser } from "../../fetch/google-oauth";

export default function Signup() {
    const [userInfo, setUserInfo] = useState(undefined);
    const [loginUrl, setLoginUrl] = useState();

    useEffect(() => {
        const getUser = async () => {
            const params = new URLSearchParams(window.location.search);
            const name = params.get("code");
            const userInfo = await fetchUser(name);
            setUserInfo(userInfo.data);
        }

        const postMessage = (event) => {
            if (event.origin !== "http://localhost:3000") {
                return
            } else {
                setLoginUrl(event.currentTarget);
            }
        }
        window.addEventListener("message", postMessage);

        getUser();

        return (
            window.addEventListener("message", postMessage)
        )
    }, []);

    const closeWindow = () => {
        //구글에서 얻은 id, name, 그리고 추가의 폼에서 얻은 date날짜를 합쳐서 post요청 
        loginUrl.close();
    }

    return (
        <div>
            {userInfo && (
                <>
                    <button onClick={closeWindow}>계정 만들기</button>
                    <h1>{userInfo.name}</h1>
                    <img src={userInfo.picture} alt="img" />
                </>
            )}
        </div>
    )
}