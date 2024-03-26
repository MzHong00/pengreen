import { useUserFetch } from "features/authentication/login";

export function ProfilesPicture() {
    const { data: user } = useUserFetch();

    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
                {<img src={user?.picture} alt="프로필 사진" className="rounded-full scale-90" />}
                {<div className="text-xl font-semibold">{user?.name}</div>}
            </div>
        </div>
    )
}