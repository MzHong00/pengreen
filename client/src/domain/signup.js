import { useEffect } from "react"

import { fetchAccess_token } from "../fetch/google-oauth";

export default function Signup() {
    useEffect(() => {
        const getToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const name = params.get("code");

            await fetchAccess_token(name);
            window.opener.postMessage('login');
            window.close();
        }
        
        getToken();
    }, []);

    return (
        <div>
            로그인중....
        </div>
    )
}