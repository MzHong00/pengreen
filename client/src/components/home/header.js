import { useState } from 'react';
import { LogoButton } from '../common/Button'
import { IoIosArrowDown } from "react-icons/io";
import ProfilesDialog from '../account/profilesDialog';
import ProfilesButton from '../account/profilesButton';

export default function Header({ setModalOpen, user }) {
    const [openProfiles, setOpenProfiles] = useState(false);

    const openProfilesIcon = () => <IoIosArrowDown />

    const profilesHandler = () => {
        setOpenProfiles(true);
    }

    const modalHandler = () => {
        setModalOpen(true);
    }

    return (
        <header className="flex justify-between py-6">
            <LogoButton />
            {
                user === undefined ? 
                <ProfilesButton handler={modalHandler} name="로그인" /> 
                :
                <div>
                    <ProfilesButton handler={profilesHandler} urlImg={user.picture} componentImg={openProfilesIcon}/>
                    {openProfiles && <ProfilesDialog setModalOpen={setOpenProfiles} user={user}/>}
                </div>
            }
        </header>
    )
}