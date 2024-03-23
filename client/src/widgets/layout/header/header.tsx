import ProfilesButton from '../../../features/account/profilesButton';

import { LoginForm } from 'features/account/loginForm';
import { useUserFetch } from 'store/queries/auth';
import { useDialog } from 'shared/hooks/useDialog';
import { Profiles } from "features/account/profiles";

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