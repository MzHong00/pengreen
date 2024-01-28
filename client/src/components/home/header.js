
import { Button, LogoButton } from '../common/Button'

export default function Header({ setModalOpen, user }) {
    const modalHandler = () => {
        setModalOpen(true);
    }

    return (
        <header className="flex justify-between py-4">
            <LogoButton />
            {
                user === undefined ? <Button handler={modalHandler} name="로그인" /> : <Button handler={modalHandler} name={user.name} />
            }
        </header>
    )
}