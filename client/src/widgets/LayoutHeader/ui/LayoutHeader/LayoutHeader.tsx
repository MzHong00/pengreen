import { LoginForm } from 'features/authentication/login';
import { useUserFetch } from 'features/authentication/login';
import { useDialog } from 'shared/hooks/useDialog';
import { ProfilesDetail } from 'widgets/profilesDetail';
import { ProfilesCard } from '../ProfilesCard/profilesCard';

export function LayoutHeader() {
    const { data: user } = useUserFetch();

    const [loginForm, openLoginForm] = useDialog(<LoginForm />);
    const [profiles, openProfiles] = useDialog(<ProfilesDetail />);

    return (
        <header className="w-full flex justify-end py-6 px-14">
            {user ? <ProfilesCard onClick={openProfiles} icon={user.picture} /> : <ProfilesCard onClick={openLoginForm} />}
            {loginForm}
            {profiles}
        </header>
    )
}