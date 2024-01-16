import { useEffect, useState } from "react"

import { fetchUser } from "../../fetch/google-oauth";

export default function Signup() {
    const [userInfo, setUserInfo] = useState(undefined);

    useEffect(() => {
        const getUser = async () => {
            const params = new URLSearchParams(window.location.search);
            const name = params.get("code");
            const userInfo = await fetchUser(name);
            setUserInfo(userInfo.data);
        }

        getUser();
    }, []);

    console.log(userInfo)
    return (
        <div>
            {userInfo && (
                <>
                    <button>계정 만들기</button>
                    <h1>{userInfo.name}</h1>
                    <img src={userInfo.picture} />
                </>
            )}
        </div>
    )
}