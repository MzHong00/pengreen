import { useState, createContext } from 'react';

import { fetchLogin } from "../fetch/google-oauth"
import LoginModal from "../components/account/loginModal"


export default function Home() {
    const [isModalOpen, setModalOpen] = useState(false);
    
    const modalHandler = () => {
        isModalOpen ? setModalOpen(false) : setModalOpen(true);
    }

    const loginHandler = async () => {
        const googleAuthUrl = await fetchLogin();
        const googleWindow = window.open(googleAuthUrl, "", "width=400, height=600, left=800, top=300, scrollbars=yes");
    }
    
    return (
        <div>
            <header>
                <button onClick={modalHandler}>login</button>
            </header>
            <main>

            </main>
            <footer>

            </footer>
            {isModalOpen && (<LoginModal loginHanler={loginHandler} platform={`구글`} />)}
        </div>
    )
}