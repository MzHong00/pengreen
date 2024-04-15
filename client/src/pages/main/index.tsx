import { useEffect } from 'react';
import { Outlet } from "react-router-dom";
import { LayoutHeader } from 'widgets/LayoutHeader';
import { Navbar } from 'widgets/LayoutNavbar';

export default function Main() {
    // root경로에 "login"의 PostMessage가 전송되면 root 페이지를 새로고침하는 리스너 장착
    // Google 로그인을 모달 창으로 하기 위해 message이벤트를 장착
    useEffect(() => {
        const getMessage = (e: MessageEvent ) => {
            console.log(e);
            
            if (e.origin !== process.env.REACT_APP_HOME_URL) {
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

    return (
        <div>
                <div>
                    <LayoutHeader />
                    <main className="w-full flex gap-5">
                        <Outlet />
                    </main>
                </div>
                <Navbar />
        </div>
    )
}