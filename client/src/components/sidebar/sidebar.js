import { useNavigate } from 'react-router-dom';

import ListButton from "../common/ListButton";
import { MdHome } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { useMemo } from 'react';

export default function Sidebar() {
    const navigate = useNavigate();

    const sideList = useMemo(() => {
        return (
            [
                {
                    name: "Home",
                    icon: () => <MdHome size="20" />,
                    handler: () => {
                        navigate('/')
                    }
                },
                {
                    name: "Dashboard",
                    icon: () => <MdOutlineSpaceDashboard size="20" />,
                    handler: () => {
                        navigate('/dashboard')
                    }
                },
            ]
        )
    }, [navigate]);

    return (
        <aside className='min-w-40'>
            <nav>
                {
                    sideList.map((idx) =>
                        <ListButton
                            key={idx.name}
                            name={idx.name}
                            componentImg={idx.icon}
                            handler={idx.handler}
                            btnStyles="hover:border-r-2 hover:border-solid hover:border-blue-300"
                            contentStyles="pl-5 w-full h-10 hover:text-blue-400" />
                    )
                }
            </nav>
        </aside>
    )
}