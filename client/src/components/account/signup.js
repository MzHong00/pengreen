import { useEffect, useState } from "react"

import { fetchUser } from "../../fetch/google-oauth";

export default function Signup() {
    const [userInfo, setUserInfo] = useState(undefined);
    const [modalWindow, setModalWindow] = useState();
    const [homeWindow, setHomeWindow] = useState();

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
                //홈의 window 객체
                setHomeWindow(event.source);
                //모달창의 window 객체
                setModalWindow(event.currentTarget);
            }
        }
        window.addEventListener("message", postMessage);

        getUser();

        return (
            window.addEventListener("message", postMessage)
        )
    }, []);

    const closeWindow = async () => {
        await homeWindow.postMessage(userInfo, "http://localhost:3000/");

        //구글에서 얻은 id, name, 그리고 추가의 폼에서 얻은 date날짜를 합쳐서 post요청 
        modalWindow.close();
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