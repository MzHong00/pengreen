import { useState, useEffect } from 'react';

import { fetchUser } from '../fetch/google-oauth';
import LoginModal from "../components/account/loginModal"
import Header from '../components/home/header';

export default function Home() {
    const [user, setUser] = useState();
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const getMessage = (e) => {
            if(e.origin !== "http://localhost:3000") {
                return
            } else {
                if(e.data === "login") {
                    window.location.reload();
                }
            }
        }

        window.addEventListener('message', getMessage);

        return () => {
            window.removeEventListener('message', getMessage);
        }
    }, [])

    useEffect(() => {
        const getUser = async () => {
            const userInfo = await fetchUser();
            setUser(userInfo);
        }

        getUser();
    }, [])

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