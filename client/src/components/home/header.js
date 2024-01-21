import { useState } from "react";

import { Button, LogoButton } from '../common/Button'

export default function Header({ setModalOpen }) {
    const [user, setUser] = useState(undefined);

    const modalHandler = () => {
        setModalOpen(true);
    }

    return (
        <header className="flex justify-between py-4">
            <LogoButton />
            <Button handler={modalHandler} name={user === undefined ? "로그인" : user} />
        </header>
    )
}