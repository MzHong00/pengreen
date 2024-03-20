import { useFetchToken } from "../model/getToken";


export function Redirect() {
    useFetchToken();

    return (
        <div>
            로그인중....
        </div>
    )
}