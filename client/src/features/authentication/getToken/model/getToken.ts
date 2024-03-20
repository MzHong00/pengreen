import { useEffect } from "react"
import { fetchToken } from "shared/api";

export const useFetchToken = () => {
    useEffect(() => {
        const getToken = async () => {
            const params = new URLSearchParams(window.location.search);
            const name = params.get("code");

            await fetchToken(name)
            window.opener.postMessage('login');
            window.close();
        }

        getToken();
    }, []);
}