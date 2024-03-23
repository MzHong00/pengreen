import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { MdHome } from "react-icons/md";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { LuArrowBigLeftDash } from "react-icons/lu";
import { LuArrowBigRightDash } from "react-icons/lu";

import Plogo from '../../../shared/common/logo';
import Button from '../../../shared/common/button';

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [toggle, setToggle] = useState(true);
    const leftArrow = () => <LuArrowBigLeftDash color='white' />
    const rightArrow = () => <LuArrowBigRightDash color='white' />

    const toggleHandler = () => {
        setToggle(toggle ? false : true);
    }

    const sideList = useMemo(() => {
        return (
            [
                {
                    name: "Home",
                    path: '/',
                    icon: () => <MdHome size="20" />,
                    handler: () => {
                        navigate('/')
                    }
                },
                {
                    name: "Dashboard",
                    path: '/dashboard',
                    icon: () => <MdOutlineSpaceDashboard size="20" />,
                    handler: () => {
                        navigate('/dashboard')
                    }
                },
            ]
        )
    }, [navigate]);

    return (
        <aside className={`relative flex flex-col ${toggle ? 'w-40 ' : '!w-14'} h-full left-0 top-0 bg-white duration-500`}>
            <div className='w-full h-12 pl-5 overflow-hidden'>
                {toggle && <Plogo />}
            </div>
            <nav className='min-w-14 h-full overflow-hidden'>
                {
                    sideList.map((path, idx) =>
                        <div className='w-40'>
                            <Button
                            key={idx}
                            name={toggle ? path.name : ""}
                            componentImg={path.icon}
                            handler={path.handler}
                            btnStyles="hover:border-r-2 hover:border-solid hover:border-blue-300 "
                            contentStyles={`w-full h-10 px-5 hover:text-blue-400 ${location.pathname === path.path && '!text-blue-400'}`} />
                        </div>)
                }
            </nav>
            <Button
                componentImg={toggle ? leftArrow : rightArrow}
                btnStyles='absolute left-full bg-slate-300'
                handler={toggleHandler} />
        </aside>
    )
}