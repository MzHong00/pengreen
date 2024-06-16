import { LoginForm } from "features/authentication/login";
import { useUserFetch } from "features/authentication/login";
import { useDialog } from "shared/hooks/useDialog";
import { ProfilesDetail } from "widgets/profilesDetail";
import { ProfilesCard } from "../ProfilesCard/profilesCard";
import { Logo } from "../Logo/logo";

export function LayoutHeader() {
  const { data: user } = useUserFetch();

  const [loginForm, openLoginForm] = useDialog(<LoginForm />);
  const [profiles, openProfiles] = useDialog(<ProfilesDetail />);

  return (
    <header className="w-full flex justify-between py-6 px-14 ">
      <Logo />
      {user ? (
        <ProfilesCard onClick={openProfiles} icon={user.picture} />
      ) : (
        <ProfilesCard onClick={openLoginForm} />
      )}
      {loginForm}
      {profiles}
    </header>
  );
}
