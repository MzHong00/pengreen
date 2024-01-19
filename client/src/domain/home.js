import { useState } from 'react';

import { fetchLogin } from "../fetch/google-oauth"
import LoginModal from "../components/account/loginModal"


export default function Home() {
    const [user, setUser] = useState(undefined);
    const [isModalOpen, setModalOpen] = useState(false);

    const modalHandler = () => {
        isModalOpen ? setModalOpen(false) : setModalOpen(true);
    }
    console.log(setUser)
    const loginHandler = async () => {
        const googleAuthUrl = await fetchLogin();
        const googleWindow = window.open(googleAuthUrl, "", "width=400, height=600, left=800, top=300, scrollbars=yes");

        setTimeout(() => {
            googleWindow.postMessage("Hello", "http://localhost:3000/auth/google/redirect");
        }, 1000)
    }

    return (
        <div className='min-h-screen'>
            <header>
                <button onClick={modalHandler}>{user === undefined ? "로그인" : user}</button>
            </header>
            <main>
                
            </main>
            <footer>

            </footer>
            {isModalOpen && (<LoginModal loginHanler={loginHandler} platform={`구글`} />)}
        </div>
    )
}