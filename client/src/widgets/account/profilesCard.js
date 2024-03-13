import { useContext } from "react"
import { UserContext } from "../../pages/main"

export default function ProfilesCard() {
    const user = useContext(UserContext);
    
    return (
        <div className="flex flex-col items-center gap-6">
            {
                user.email &&
                <div className="text-s">
                    {user.email}
                </div>
            }
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