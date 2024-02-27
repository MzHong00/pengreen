import { useContext, useState } from 'react';

import LogoButton from '../common/logoButton';
import { IoIosArrowDown } from "react-icons/io";
import ProfilesDialog from '../account/profilesDialog';
import ProfilesButton from '../account/profilesButton';
import { UserContext } from '../../domain/pengreen';

export default function Header({ setModalOpen }) {
    const { user } = useContext(UserContext)
    const [openProfiles, setOpenProfiles] = useState(false);

    const openProfilesIcon = () => <IoIosArrowDown />

    const profilesHandler = () => {
        setOpenProfiles(true);
    }

    const modalHandler = () => {
        setModalOpen(true);
    }

    return (
        <header className="flex justify-between py-6 px-14">
            <LogoButton />
            {
                user === undefined ?
                    <ProfilesButton handler={modalHandler} name="로그인" />
                    :
                    <div>
                        <ProfilesButton handler={profilesHandler} urlImg={user.picture} componentImg={openProfilesIcon} />
                        {openProfiles && <ProfilesDialog setModalOpen={setOpenProfiles} />}
                    </div>
            }
        </header>
    )
}