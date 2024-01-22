import { useState, useEffect } from 'react';

import LoginModal from "../components/account/loginModal"
import Header from '../components/home/header';

export default function Home() {
    const [user, setUser] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const postMessage = (event) => {
            if (event.origin !== "http://localhost:3000") {
                return
            } else {
                setModalOpen(false)
                setUser(event.data);
            }
        }
        window.addEventListener("message", postMessage);

        return (
            window.addEventListener("message", postMessage)
        )
    }, []);

    return (
        <div className='min-h-screen mx-14'>
            <Header user={user} setModalOpen={setModalOpen} />
            <main>
                
            </main>
            <footer>

            </footer>
            {isModalOpen && (<LoginModal setModalOpen={setModalOpen} />)}
        </div>
    )
}