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

        window.addEventListener("message", (event) => {
            if (event.origin !== "http://localhost:3000") {
                return
            } else {
                setLoginUrl(event.currentTarget);
            }
        })

        getUser();
    }, []);

    const closeWindow = () => {
        loginUrl.close();
    }

    return (
        <div>
            {userInfo && (
                <>
                    <button onClick={closeWindow}>계정 만들기</button>
                    <h1>{userInfo.name}</h1>
                    <img src={userInfo.picture} alt="img"/>
                </>
            )}
        </div>
    )
}