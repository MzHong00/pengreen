import { useState, useEffect } from 'react';

import { fetchUser } from '../fetch/google-oauth';
import LoginModal from "../components/account/loginModal"
import Header from '../components/home/header';

export default function Home() {
    const [user, setUser] = useState({});
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const postMessage = (event) => {
            console.log(event)
            if (event.origin !== "http://localhost:3000/auth/google") {
            return;
            }
        console.log("Received message:", event.data);
        }
        window.addEventListener("message", postMessage);

        return (
            window.removeEventListener("message", postMessage)
        )
    }, []);

    useEffect(() => {
        const getUser= async() => {
            const userInfo = await fetchUser();
            setUser(userInfo);
        }

        getUser();
    })
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