import { useUserFetch } from "features/authentication/auth"

export default function ProfilesCard() {
    const {data: user} = useUserFetch();
    
    return (
        <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-3">
                {
                    user.picture && <img src={user.picture} alt="프로필 사진" className="rounded-full scale-90"></img>
                }
                {
                    user.name &&
                    <div className="text-xl font-semibold">
                        {user.name}
                    </div>
                }
            </div>
        </div>
    )
}