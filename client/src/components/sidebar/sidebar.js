import ListButton from "../common/ListButton";
import { MdHome } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export default function Sidebar() {
    const sideList = [
        {
            name: "Home",
            icon: () => <MdHome size="20" />
        },
        {
            name: "Dashboard",
            icon: () => <MdOutlineSpaceDashboard size="20" />
        },
    ]

    return (
        <div className='w-48 min-h-screen rounded-r-lg overflow-hidden'>
            <aside className='flex flex-col '>
            {
                sideList.map((idx) => 
                    <ListButton 
                        key={idx.name}
                        name={idx.name}
                        componentImg={idx.icon}
                        contentStyles="pl-5 h-10"/>
                )
            }
            </aside>
        </div>
    )
}