import { useState, useEffect, createContext } from 'react';

import { fetchUser } from '../fetch/google-oauth';

import LoginModal from "../components/account/loginModal"
import Header from '../components/pengreen/header';
import Main from '../components/pengreen/main';
import Sidebar from '../components/sidebar/sidebar';

export const UserContext = createContext();

export default function Pengreen() {
    const [user, setUser] = useState();
    const [isModalOpen, setModalOpen] = useState(false);

    // root경로에 "login"의 PostMessage가 전송되면 root 페이지를 새로고침하는 리스너 장착
    useEffect(() => {
        const getMessage = (e) => {
            if (e.origin !== "http://localhost:3000") {
                return
            } else {
                if (e.data === "login") {
                    window.location.reload();
                }
            }
        }

        window.addEventListener('message', getMessage);

        return () => {
            window.removeEventListener('message', getMessage);
        }
    }, [])

    // access token이 있는 상태에서 fetchUser()를 호출하면 사용 가능한 유저 정보가 반환됨
    useEffect(() => {
        const getUser = async () => {
            const userInfo = await fetchUser();
            setUser(userInfo);
        }

        getUser();
    }, [])

    return (
        <div className='min-h-screen flex'>
            <UserContext.Provider value={{ user }}>
                <Sidebar />
                <div>
                    <Header setModalOpen={setModalOpen} />
                    <Main />
                </div>

            </UserContext.Provider>
            {isModalOpen && (<LoginModal setModalOpen={setModalOpen} />)}
        </div>
    )
}