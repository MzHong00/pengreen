import ProfilesButton from '../account/profilesButton';

import { LoginForm, useUserFetch } from 'features/authentication/auth';
import { useDialog } from 'shared/ui/Dialog/useDialog';
import { Profiles } from "widgets/account/profiles";

export default function Header() {
    const { data: user } = useUserFetch();

    const [loginForm, openLoginForm] = useDialog(LoginForm);
    const [userProfiles, openUserProfiles] = useDialog(Profiles);

    return (
        <header className="flex justify-between py-6 px-14">
            {
                user ?
                    <>
                        <ProfilesButton onClick={openUserProfiles} icon={user.picture}/>
                        {userProfiles}
                    </>
                    :
                    <>
                        <ProfilesButton onClick={openLoginForm}/>
                        {loginForm}
                    </>
            }
        </header>
    )
}