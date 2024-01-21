import { useState } from 'react';

import LoginModal from "../components/account/loginModal"
import Header from '../components/home/header';

export default function Home() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className='min-h-screen mx-14'>
            <Header {...{setModalOpen}} />
            <main>
                
            </main>
            <footer>

            </footer>
            {isModalOpen && (<LoginModal setModalOpen={setModalOpen} />)}
        </div>
    )
}