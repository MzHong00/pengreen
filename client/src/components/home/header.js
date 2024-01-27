
import { Button, LogoButton } from '../common/Button'

export default function Header({ setModalOpen, user}) {

    const modalHandler = () => {
        setModalOpen(true);
    }

    return (
        <header className="flex justify-between py-4">
            <LogoButton />
            
            <Button handler={modalHandler} name={user === undefined ? "로그인" : user.name} />
        </header>
    )
}