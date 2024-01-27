import { useEffect } from "react"

import { fetchAccess_token } from "../../fetch/google-oauth";

export default function Signup() {
    useEffect(() => {
        const getToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const name = params.get("code");

            await fetchAccess_token(name);
        }

        getToken();
    }, []);

    const closeWindow = async () => {
        window.postMessage("hi", "http://localhost:3000");
    }

    return (
        <div>
            <button onClick={closeWindow}>돌아가기</button>
        </div>
    )
}